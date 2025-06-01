// src/adapters/redis.ts
import { RedisClientType } from '@redis/client';
import type { ChatMemoryAdapter, Message } from '../types';

export class RedisMemoryAdapter implements ChatMemoryAdapter {
  constructor(private client: RedisClientType) {}

  private getKey(userId: string): string {
    return `chat:${userId}`;
  }

  async addMessage(userId: string, message: Message): Promise<void> {
    const key = this.getKey(userId);
    await this.client.rPush(
      key,
      JSON.stringify({
        ...message,
        timestamp: message.timestamp ?? Date.now(),
      }),
    );
  }

  async getMessages(userId: string): Promise<Message[]> {
    const key = this.getKey(userId);
    const rawMessages = await this.client.lRange(key, 0, -1);

    return rawMessages.map((raw) => {
      try {
        return JSON.parse(raw) as Message;
      } catch {
        return { role: 'system', content: '[corrupted message]' };
      }
    });
  }

  async clear(userId: string): Promise<void> {
    await this.client.del(this.getKey(userId));
  }
}
