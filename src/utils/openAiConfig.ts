import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env[ "OPENAI_API_KEY" ],
	dangerouslyAllowBrowser: true
});

const main = async() => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);
}

export default main;