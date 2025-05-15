import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// ────────────────────────────────────────────────────────────
// Config
// ────────────────────────────────────────────────────────────
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY_LOCAL })
const MAX_TRIES = 3

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────
const buildPrompt = (userResponse1: string, userResponse2: string) => `
You are a reflection assistant. The user will answer two introspective questions. Based on their answers, return:

- An overall alignment score (0–100)
- A one-sentence summary of their integrity today
- A one-sentence flag if any avoidance, weakness, or drift is detected

Your response should look like this:
{
  "score": number,
  "summary": string,
  "flag": string | null
}

Answers:
1. ${userResponse1}
2. ${userResponse2}
`

// ────────────────────────────────────────────────────────────
// Route handler (no async/await; returns a Promise<NextResponse>)
// ────────────────────────────────────────────────────────────
export const POST = (req: Request): Promise<Response> => {
  return req
    .json()
    .then(({ userResponse1, userResponse2 }) => {
      console.log(`Let's start the API response fetch. UserResponse1: ${userResponse1}. UserResponse2: ${userResponse2}`)
      const prompt = buildPrompt(userResponse1, userResponse2)
      console.log(`ChatGPT Prompt: ${prompt}`)
      return fetchCompletion(prompt)
    })
    .then(validRawJson => {
      // If OpenAI returned nothing useful after retries, keep the app alive
      const safeJson = validRawJson ?? '{"score":0,"summary":"No summary.","flag":"No flag."}'
      const parsed = JSON.parse(safeJson)
      return NextResponse.json(parsed)
    })
    .catch(error => {
      console.error('Reflection API error:', error)
      return NextResponse.json({ error: `Failed to generate reflection. Error: ${error}` }, { status: 500 })
    })
}

const isReplyGood = (chatGptReply?: string): boolean => {
  // No reply from chatGpt. That's a Bad reply.
  if (!chatGptReply) return false

  const parsedChatGptReply = JSON.parse(chatGptReply)
  if (typeof parsedChatGptReply.score === 'number' && typeof parsedChatGptReply.summary === 'string') {
    return true
  } else {
    return false
  }
}

// Recursive fetch with retry logic
const fetchCompletion = (prompt: string, attempt = 1): Promise<string | undefined> =>
  openai.chat.completions
    .create({
      model: 'gpt-4o', // or 'gpt-4' if you prefer
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }]
    })
    .then(res => res.choices[0]?.message?.content?.trim())
    .then(chatGptReply => {
      console.log(`ChatGPT response: ${chatGptReply}`)

      // If the ChatGPT reply is good
      if (isReplyGood(chatGptReply)) {
        console.log('Reply is good')
        return chatGptReply
      }

      // If the ChatGPT reply is bad
      // -----
      // We have more attempts, let's try to get another response
      if (attempt < MAX_TRIES) {
        console.log(`Attempt #${attempt} produced an invalid reply. Retrying …`)
        return fetchCompletion(prompt, attempt + 1)
      }
      // No more attempts left. We give up.
      else {
        console.log(`Attempt #${attempt} is the last try. Returning whatever we got.`)
        return chatGptReply // may be undefined or invalid JSON, but we give up
      }
    })
    // API error
    .catch(err => {
      // We still have attempts left, retry getting response
      if (attempt < MAX_TRIES) {
        console.log(`OpenAI error on attempt #${attempt}: ${err}. Retrying …`)
        return fetchCompletion(prompt, attempt + 1)
      }
      // No more attempts left. Give up
      return Promise.reject(err)
    })
