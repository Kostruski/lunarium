import OpenAI from 'openai';
import { ChatStorage } from './chat-storage';
import { kv } from '@vercel/kv';

const openai = new OpenAI({
	apiKey: process.env[ "OPENAI_API_KEY" ],
} );

const db = new ChatStorage();

const mainAi = async ( content: string ) => {
	if ( !content.length ) '';

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content, }],
    model: 'gpt-3.5-turbo',
	} );

	const msg = chatCompletion.choices[0]?.message?.content || '';

	db.addToChat( content );
	if ( msg ) db.addToChat( msg );
	db.save();

  return (msg);
}


export default mainAi;
