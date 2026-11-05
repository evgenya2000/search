import { create } from 'zustand';
import type { Message } from './types';

interface ChatState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
}

function generateId(): string {
  return Date.now() + '-' + Math.random().toString(36).slice(2, 9);
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, id: generateId(), createdAt: new Date() }],
    })),
}));
