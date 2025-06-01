/* eslint-disable @typescript-eslint/require-await */

import { ChatMemoryAdapter, Message } from '../types';

export class InMemoryAdapter implements ChatMemoryAdapter {
  private store = new Map<string, Message[]>();

  async addMessage(userId: string, message: Message): Promise<void> {
    const messages = this.store.get(userId) || [];

    messages.push({ ...message, timestamp: message.timestamp ?? Date.now() });

    this.store.set(userId, messages);
  }

  async getMessages(userId: string): Promise<Message[]> {
    return this.store.get(userId) ?? [];
  }

  async clear(userId: string): Promise<void> {
    this.store.delete(userId);
  }
}
