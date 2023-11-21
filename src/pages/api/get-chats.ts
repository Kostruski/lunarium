import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import { CHATS } from '../../utils/chat-storage';

type NewType = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewType>,
) {
    try {
      // 0 is the first element; -1 is the last element
      // So this returns the whole list
      const list = await kv.lrange(CHATS, 0, -1);
			console.log( list );
			res.status(200).json({ answer: JSON.stringify(list) });
    } catch (error) {
      res.status(500).json({ answer: JSON.stringify(error) });
    }
}
