import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  const { response1, response2 } = await req.json()

  const prompt = `
You are a reflection assistant. The user will answer two introspective questions. Based on their answers, return:

- An overall alignment score (0–100)
- A one-sentence summary of their integrity today
- A one-sentence flag if any avoidance, weakness, or drift is detected

Format as valid JSON:
{
  "score": number,
  "summary": string,
  "flag": string | null
}

Answers:
1. ${response1}
2. ${response2}
`

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    })

    const json = completion.data.choices[0].message?.content || '{}'
    const result = JSON.parse(json)
    return NextResponse.json(result)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to generate reflection' }, { status: 500 })
  }
}
