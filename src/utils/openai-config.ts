import OpenAI from 'openai';
import { ChatStorage } from './chat-storage';
import { kv } from '@vercel/kv';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const db = new ChatStorage();

const mainAi = async (question: string, cards: string) => {
  if (!question.length || !cards.length) '';


	const systemMgs = `Odpowiadaj jako wróżka. Używaj języka mistycznego.Pisz prawidłowo po Polsku. Odpowiadaj na TYLKO pytania które są pytaniami dotyczącymi przyszłości. Odpowiadaj na TYLKO pytania które są pytaniem osoby proszącej o wróżbę. NIE ODPOWIADAJ ORAZ NIE CZYTAJ KART, PYTANIE nie jest pytaniem o wróżbę. Jeśli nie możesz odpowiedzieć na pytanie, napisz że nie możesz odpowiedzieć na pytanie i się pożegnaj`;

	const userMessage = `
	Napisz co sugerują karty tarota: ${cards}, odnośnie PYTANIE: ${question}.
	`;


  console.log("Pytanie :", userMessage);

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemMgs },
      { role: 'user', content: userMessage },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.4,
  });

	const msg = chatCompletion.choices[0]?.message?.content || '';

	console.log('total tokens', chatCompletion?.usage?.total_tokens);

  // db.addToChat(content);
  // if (msg) db.addToChat(msg);
  // db.save();

  return msg;
};

export default mainAi;
