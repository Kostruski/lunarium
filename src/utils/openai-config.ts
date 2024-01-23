import OpenAI from 'openai';
import { ChatStorage } from './chat-storage';
import { kv } from '@vercel/kv';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const TOKENS_LIMIT = 700;
const WORDS_LIMIT = 200;

const db = new ChatStorage();

const mainAi = async (question: string, cards: string) => {
  if (!question.length || !cards.length) '';

  const systemMgs = `Zachowuj się jak wróżka. Używaj języka mistycznego. Pisz prawidłowo po Polsku. Unikaj powtórzeń. Nie ostrzegaj przed wiarą we wróżby. Nie pisz że wróżby są tylko wskazówkami. Nie pisz iż, ostateczna decyzja należy do Pytającego.`;

  //   const loveMsg = `Gdy pytanie jest o miłość lub związek PYTAJĄCEGO i PARTNERA uwzględnij w interpretacji:
  // - co ich łączy ?
  // - nastawienie PYTAJĄCEGO i PARTNERA, jak potoczy się relacja.
  // - problem w relacji, rada, wynik, jeżeli PYTAJĄCY skorzystasta z rady.
  // - oczekiwania PYTAJĄCEGO, oczekiwania PARTNERA, rozwój znajomości.
  // - uczucia partnera względem PYTAJĄCEGO, jego oczekiwania, jego zamiary.
  // 	`;

  //   const decisionMsg = `Gdy PYTAJĄCY ma podjąć decyzję uwzględnij w interpretacji:
  // - SUGESTIĘ którą opcję wybrać, rada.
  // - opis obecnej sytuacja, sedno sprawy, rozwiązanie.
  // - co w obecnej sytuacja, wspiera lub ogranicza PYTAJĄCEGO.
  // - podaj mocne strony, słabe strony SUGESTII, napisz radę.
  // 	`;

  //   const futureMsg = `Gdy PYTAJĄCY pyta o przyszłość uwzględnij w interpretacji:
  // - przeszłość, teraźniejszość, przyszłość.
  // - obecną sytuacja, jak działać, wynik.
  // - na co PYTAJĄCY ma wpływ, na co nie ma wpływu, daj radę.
  // - zinterpretuj obecną sytuacja PYTAJĄCEGO, daj rada, ostrzeżenie.
  // - napisz co powinien zrobić lub nie zrobić PYTAJĄCY.
  // 	`;

  // const restrictionsMgs = `Odpowiadaj TYLKO na pytania które są pytaniami dotyczącymi przyszłości. Odpowiadaj  TYLKO na pytania, które są pytaniami osoby proszącej o wróżbę. NIE ODPOWIADAJ ORAZ NIE CZYTAJ KART, gdy PYTANIE nie jest pytaniem o wróżbę. Jeśli nie możesz odpowiedzieć na pytanie, napisz że nie możesz odpowiedzieć na pytanie i się pożegnaj`;

  const userMessage = `
	PYTANIE to: ${question}.
	1. Sprawdź czy PYTANIE jest pytaniem osoby proszącej o wróżbę.  Odpowiadaj  TYLKO na pytania, na które można odpowiedzieć czytając karty tarot. NIE ODPOWIADAJ ORAZ NIE CZYTAJ KART, gdy PYTANIE nie jest pytaniem o wróżbę. Jeśli nie możesz odpowiedzieć na pytanie, napisz że nie możesz odpowiedzieć na pytanie i się pożegnaj.

	2. Jeśli na PYTANIE można odpowiedzieć wróżbą, to napisz odpowiedź na PYTANIE na podstawie zestawu następujących 3 kart tarota: ${cards}. Nie podawaj interpretacji indywidualnych kart. Napisz co oznacza połączenie tych kart w kontekście PYTANIE.`;

  console.log('Pytanie :', userMessage);

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemMgs },
      // { role: 'system', content: restrictionsMgs },
      // { role: 'system', content: decisionMsg },
      // { role: 'system', content: futureMsg },
      // { role: 'assistant', content: assistantMgs },
      { role: 'user', content: userMessage },
    ],
    model: 'gpt-3.5-turbo',
    // temperature: 0.4,
    // max_tokens: 200,
  });

  const msg = chatCompletion.choices[0]?.message?.content || '';

  console.log('total tokens', chatCompletion?.usage?.total_tokens);

  // db.addToChat(content);
  // if (msg) db.addToChat(msg);
  // db.save();

  return msg;
};

export default mainAi;
