import styled from 'styled-components';
import { Bot, User } from 'lucide-react';
import { useChatStore, type Message } from '@/entities/chat';
import { MessageInput } from '@/features/send-message';
import { Spinner } from '@/shared/ui';
import { useI18n } from '@/shared/lib';

interface ChatPanelProps {
  onSend: (text: string) => Promise<void>;
  isTyping: boolean;
}

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.background};
`;
const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 12rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  gap: 0.5rem;
`;
const MessageRow = styled.div<{ $role: Message['role'] }>`
  display: flex;
  justify-content: ${({ $role }) => ($role === 'user' ? 'flex-end' : 'flex-start')};
`;
const Bubble = styled.div<{ $role: Message['role'] }>`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  max-width: 85%;
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ $role, theme }) =>
    $role === 'user' ? theme.colors.primary : theme.colors.surface};
  color: ${({ $role, theme }) => ($role === 'user' ? '#ffffff' : theme.colors.text)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;
const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0.7;
`;
const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;
const TypingRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export function ChatPanel({ onSend, isTyping }: ChatPanelProps) {
  const { t } = useI18n();
  const messages = useChatStore((state) => state.messages);

  return (
    <Panel>
      <Messages>
        {messages.length === 0 ? (
          <EmptyState><Bot size={48} /><p>{t('chat.emptyState')}</p></EmptyState>
        ) : messages.map((message) => (
          <MessageRow key={message.id} $role={message.role}>
            <Bubble $role={message.role}>
              <Avatar aria-hidden>{message.role === 'user' ? <User size={14} /> : <Bot size={14} />}</Avatar>
              <Text>{message.text}</Text>
            </Bubble>
          </MessageRow>
        ))}
        {isTyping && (
          <TypingRow><Bubble $role="assistant"><Avatar aria-hidden><Bot size={14} /></Avatar><Spinner size="sm" label={t('chat.loading')} /></Bubble></TypingRow>
        )}
      </Messages>
      <MessageInput onSend={onSend} isLoading={isTyping} />
    </Panel>
  );
}
