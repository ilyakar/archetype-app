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
const buildPrompt = (question: string, userResponse: string, personalValues: string) => `
You are a reflection assistant. The user has provided an answer for the following question:

-------------
"${question}"
(the answer should be 20 words or more)

The user's answer:
${userResponse}

The user's personal values:
${personalValues}
-----------

- If the user's answer looks thoughtful then questionPassed should be true. If it looks like the user is just trying to brush off the task, then output false. Note: you are not gauging how well the answer aligns with the personal values. You are just assessing whether the user has put thought into their answer.
- If questionPassed is false, provide a 1-sentence questionFailedSummary of why you believe the answer doesn't possess enough reflection. Should be written as if talking with the user "Your answer..."

Your response should be valid json in this format:
{
  "questionPassed": boolean,
  "questionFailedSummary": string | null
}
`

// ────────────────────────────────────────────────────────────
// Route handler
// ────────────────────────────────────────────────────────────
export const POST = (req: Request): Promise<Response> => {
  return req
    .json()
    .then(({ question, userResponse, personalValues }) => {
      const prompt = buildPrompt(question, userResponse, personalValues)
      console.log('Sending the following prompt to OpenAi:', prompt)
      return fetchCompletion(prompt)
    })
    .then(validRawJson => {
      if (!validRawJson) {
        throw new Error('No valid json received from OpenAI')
      }
      const parsed = JSON.parse(validRawJson)
      return NextResponse.json(parsed)
    })
    .catch(error => {
      console.error('Got an error trying to work with OpenAI:', error)
      throw new Error(error)
    })
}

const isReplyGood = (chatGptReply?: string): boolean => {
  // No reply from chatGpt. That's a Bad reply.
  if (!chatGptReply) return false

  const parsedChatGptReply = JSON.parse(chatGptReply)
  if (typeof parsedChatGptReply.questionPassed === 'boolean' && typeof parsedChatGptReply.questionFailedSummary === 'string') {
    return true
  } else {
    return false
  }
}

// Recursive fetch with retry logic
const fetchCompletion = (prompt: string, attempt = 1): Promise<string | undefined> =>
  openai.chat.completions
    .create({
      model: 'gpt-4o',
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }]
    })
    // Gets the relevant data from OpenAi's response
    .then(response => response.choices[0]?.message?.content)
    // Cleans up the OpenAI response (sometimes includes ```json ... ``` wrappings, whitespaces, etc.
    .then(response =>
      response
        ?.trim()
        .replace(/^```json/, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim()
    )
    // The cleaned and good chatGpt output
    .then(chatGptReply => {
      // If the ChatGPT reply is good
      if (isReplyGood(chatGptReply)) {
        return chatGptReply
      }

      // If the ChatGPT reply is bad
      // -----
      // We have more attempts, let's try to get another response
      if (attempt < MAX_TRIES) {
        console.info(`Attempt #${attempt} produced an invalid reply. Retrying …`)
        return fetchCompletion(prompt, attempt + 1)
      }
      // No more attempts left. We give up.
      else {
        console.info(`Attempt #${attempt} is the last try. Returning whatever we got.`)
        return chatGptReply // may be undefined or invalid JSON, but we give up
      }
    })
    // API error
    .catch(err => {
      // We still have attempts left, retry getting response
      if (attempt < MAX_TRIES) {
        console.info(`OpenAI error on attempt #${attempt}: ${err}. Retrying …`)
        return fetchCompletion(prompt, attempt + 1)
      }
      // No more attempts left. Give up
      return Promise.reject(err)
    })
