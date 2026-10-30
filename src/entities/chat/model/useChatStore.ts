import { create } from 'zustand';
import type { Message } from './types';

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  setTyping: (value: boolean) => void;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Chat entity store.
 * Owns the message list and the assistant typing indicator.
 */
export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: generateId(), createdAt: new Date() },
      ],
    })),
  setTyping: (value) => set({ isTyping: value }),
}));
