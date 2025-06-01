import { InMemoryAdapter } from './adapters/memory';
import { RedisMemoryAdapter } from './adapters/redis';
import { redisClient } from './redisClient';
import { Backend, ChatMemoryAdapter, Strategy } from './types';

export function createMemoryStore(config: { backend: Backend; config?: any; strategy?: Strategy }) {
  let adapter: ChatMemoryAdapter;

  switch (config.backend) {
    case 'memory':
      adapter = new InMemoryAdapter();
      break;

    case 'redis':
      adapter = new RedisMemoryAdapter(redisClient);
      break;

    default:
      throw new Error(`Unsupported backend: ${config.backend}`);
  }

  return {
    addMessage: adapter.addMessage.bind(adapter),
    getHistory: adapter.getMessages.bind(adapter),
    clear: adapter.clear.bind(adapter),
  };
}
