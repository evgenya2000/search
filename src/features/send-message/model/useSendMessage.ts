import { useCallback } from 'react';
import { useChatStore } from '@/entities/chat';

/**
 * Feature hook for sending a message.
 * Adds the user message to the chat store and simulates an assistant reply.
 */
export function useSendMessage() {
  const addMessage = useChatStore((state) => state.addMessage);
  const setTyping = useChatStore((state) => state.setTyping);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      addMessage({ role: 'user', text: text.trim() });
      setTyping(true);

      // Simulate assistant thinking and response.
      await new Promise((resolve) => setTimeout(resolve, 1200));

      addMessage({
        role: 'assistant',
        text: 'I received your request. I will search for suitable land plots and show the best options below.',
      });
      setTyping(false);
    },
    [addMessage, setTyping]
  );

  return { sendMessage };
}
