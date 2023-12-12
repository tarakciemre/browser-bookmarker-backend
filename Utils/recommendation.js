import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPEN_API_KEY;

const requestOptions = {
  temperature: 0,
};

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function requestFromOpenAi(url) {
  const openAiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Determine the category of the provided website with url: " +
          url +
          " and offer 3 similar websites with the same category in the format 'https?://(continue)'." +
          "Response format should be: category: <category>, similar websites: <website1>, <website2>, <website3>.",
      },
    ],
    ...requestOptions,
  });

  return openAiResponse.choices[0].message.content;
}
