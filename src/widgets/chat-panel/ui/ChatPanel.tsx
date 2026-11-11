import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Bot, ChevronDown, User } from 'lucide-react';
import { useChatStore, type Message } from '@/entities/chat';
import { MessageInput } from '@/features/send-message';
import { Spinner } from '@/shared/ui';
import { useI18n } from '@/shared/lib';

interface ChatPanelProps {
  onSend: (text: string) => Promise<void>;
  isTyping: boolean;
  scrollToMessageId: string | null;
}

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  flex: 0 0 50vh;
  height: 50vh;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.background};
`;
const Messages = styled.div`
  flex: 1;
  min-height: 0;
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
const MessageBody = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`;
const Text = styled.p<{ $expanded: boolean }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  max-height: ${({ $expanded }) => ($expanded ? 'none' : '9em')};
  overflow: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};
`;
const MeasureText = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  margin: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;
const ExpandButton = styled.button<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  margin: 0.25rem 0 0 auto;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: inherit;
  opacity: 0.75;
  cursor: pointer;
  transition: opacity 150ms ease, background-color 150ms ease;

  &:hover {
    opacity: 1;
    background-color: rgba(127, 127, 127, 0.15);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  svg {
    transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'none')};
    transition: transform 150ms ease;
  }
`;
const TypingRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const MAX_MESSAGE_LINES = 6;

interface ChatMessageBubbleProps {
  message: Message;
  scrollToStart: boolean;
}

function ChatMessageBubble({ message, scrollToStart }: ChatMessageBubbleProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const measure = measureRef.current;
    if (!content || !measure) return;

    const updateOverflow = () => {
      const lineHeight = Number.parseFloat(window.getComputedStyle(measure).lineHeight);
      if (!Number.isFinite(lineHeight)) return;
      const nextCanExpand = measure.scrollHeight > lineHeight * MAX_MESSAGE_LINES + 1;
      setCanExpand((current) => (current === nextCanExpand ? current : nextCanExpand));
    };

    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(content);
    observer.observe(measure);
    return () => observer.disconnect();
  }, [message.text]);

  useEffect(() => {
    if (scrollToStart) {
      rowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollToStart]);

  return (
    <MessageRow ref={rowRef} $role={message.role}>
      <Bubble $role={message.role}>
        <Avatar aria-hidden>{message.role === 'user' ? <User size={14} /> : <Bot size={14} />}</Avatar>
        <MessageBody ref={contentRef}>
          <Text id={'message-text-' + message.id} $expanded={isExpanded}>{message.text}</Text>
          <MeasureText ref={measureRef} aria-hidden>{message.text}</MeasureText>
          {canExpand && (
            <ExpandButton
              type="button"
              $expanded={isExpanded}
              title={t(isExpanded ? 'chat.collapseMessage' : 'chat.expandMessage')}
              aria-label={t(isExpanded ? 'chat.collapseMessage' : 'chat.expandMessage')}
              aria-expanded={isExpanded}
              aria-controls={'message-text-' + message.id}
              onClick={() => setIsExpanded((value) => !value)}
            >
              <ChevronDown size={16} aria-hidden />
            </ExpandButton>
          )}
        </MessageBody>
      </Bubble>
    </MessageRow>
  );
}


export function ChatPanel({ onSend, isTyping, scrollToMessageId }: ChatPanelProps) {
  const { t } = useI18n();
  const messages = useChatStore((state) => state.messages);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    const lastMessage = messages[messages.length - 1];
    if (!container || !lastMessage || lastMessage.id === scrollToMessageId) return;

    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, scrollToMessageId]);

  return (
    <Panel>
      <Messages ref={messagesRef}>
        {messages.length === 0 ? (
          <EmptyState><Bot size={48} /><p>{t('chat.emptyState')}</p></EmptyState>
        ) : messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            scrollToStart={message.id === scrollToMessageId}
          />
        ))}
        {isTyping && (
          <TypingRow><Bubble $role="assistant"><Avatar aria-hidden><Bot size={14} /></Avatar><Spinner size="sm" label={t('chat.loading')} /></Bubble></TypingRow>
        )}
      </Messages>
      <MessageInput onSend={onSend} isLoading={isTyping} />
    </Panel>
  );
}
