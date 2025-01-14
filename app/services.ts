import OpenAI from "openai";

const OPEN_AI_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

const client = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function Translate(userMessage?: any) {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful translator.",
        },
        {
          role: "user",
          content: `Translate it to Bengali: ${userMessage}`,
        },
      ],
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 100,
    });

    console.log(chatCompletion.choices[0].message.content);

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}
