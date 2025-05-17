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
const userDataForPrompt = () => {}

const buildPrompt = (question: string, userResponse: string, personalValues: string) => {
  let userData = ''
  // If we're analysing the personal values question
  // ----------------------
  if (question == 'What are your personal values?') {
    userData = `"${question}"
(the answer should be 20 words or more)

The user's answer:
${userResponse}`
  }

  // If we're analysing the other questions, include personal values into the user data
  // ---------------------
  else {
    userData = `"${question}"
(the answer should be 20 words or more)

The user's answer:
${userResponse}

The user's personal values:
${personalValues}`
  }

  // The full prompt
  // ----------------------
  return `You are a reflection assistant. The user has provided an answer for the following question:

-------------
${userData}
-----------

- Gauge how thoughtful the user's answer is. If it's very thoughtful give a score of 100. If it looks like the user is just trying to brush off the task, then give a score of 0. Note: you are not gauging how well the answer aligns with the personal values. You are just assessing whether the user has put thought into their answer.
- If the question score is <30%, provide a 1-sentence answerFailedSummary of why you believe the answer doesn't possess enough reflection. Should be written as if talking with the user "Your answer..."

Your response should be valid json in this format:
{
  "answerScore": number,
  "answerFailedSummary": string | null
}`
}

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
      return NextResponse.json(error)
    })
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
        console.info(`Attempt #${attempt} produced an invalid reply:
${chatGptReply}.

Retrying …`)
        return fetchCompletion(prompt, attempt + 1)
      }
      // No more attempts left. We give up.
      else {
        console.info(`Attempt #${attempt} is the last try. Returning whatever we got:
${chatGptReply}`)
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

const isReplyGood = (chatGptReply?: string): boolean => {
  // No reply from chatGpt. That's a Bad reply.
  if (!chatGptReply) return false

  const parsedChatGptReply = JSON.parse(chatGptReply)

  // If we got the answerScore correctly from ChatGPT, great!
  if (parsedChatGptReply.answerScore >= 0 && parsedChatGptReply.answerScore <= 100) {
    // The answerScore is 30 or more, means the answer is good. All good, we need nothing more.
    if (parsedChatGptReply.answerScore >= 30) {
      return true
    }

    // The answerScore is low. If ChatGPT provided an answerFailedSummary
    else if (parsedChatGptReply.answerScore < 30 && typeof parsedChatGptReply.answerFailedSummary === 'string') {
      return true
    }

    // The answerScore is low. But ChatGPT didn't provide an answerFailedSummary. Fail
    else {
      return false
    }
  }

  // Didn't get an answer score from ChatGPT. Fail.
  else {
    return false
  }
}
