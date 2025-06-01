# 🧠 chat-memory-store

A pluggable memory storage layer for LLM/chatbot applications.
Supports in-memory, Redis, and PostgreSQL backends, with a clean unified API.

---

## ✨ Features

- ✅ Simple message-based API: `addMessage`, `getMessages`, `clear`
- 🔌 Pluggable backends: `memory`, `redis`, `postgres` (more coming)
- 🪜 Sliding window + summarization (planned)
- ⚡️ Compatible with agents, chatbots, LLM apps
- 🔄 Easy to integrate into LangChain, LlamaIndex, tRPC, etc.

---

## 📦 Installation

```bash
npm install chat-memory-store
