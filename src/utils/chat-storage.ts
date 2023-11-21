import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { kv } from '@vercel/kv';
export const CHATS = 'chats';

export class ChatStorage {
  chat: String[];

  constructor() {
    this.chat = [];
  }

  addToChat(text: string) {
    this.chat.push(text);
  }

  async save() {
    try {
      const res = await kv.lpush(CHATS, this.chat);
      console.log('chat saved', res);
    } catch (e) {
      console.error('failed to save chat: ', e);
    }
	}
}
