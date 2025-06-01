export type Role = 'user' | 'assistant' | 'system';
export type Strategy = 'slidingWindow' | 'none';

export const BACKENDS = ['redis', 'memory', 'postgres'] as const;
export type Backend = (typeof BACKENDS)[number];

export interface Message {
  role: Role;
  content: string;
  timestamp?: number;
}

export interface HistoryOptions {
  limit?: number;
  summarization?: boolean;
}

export interface ChatMemoryAdapter {
  addMessage(userId: string, message: Message): Promise<void>;
  getMessages(userId: string): Promise<Message[]>;
  clear(userId: string): Promise<void>;
}
