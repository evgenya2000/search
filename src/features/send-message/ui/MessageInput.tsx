import { useState, type FormEvent, type KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useI18n } from '@/shared/lib';

interface MessageInputProps {
  onSend: (text: string) => Promise<void>;
  isLoading: boolean;
}

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 8rem;
  max-height: 18rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  resize: vertical;

  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

export function MessageInput({ onSend, isLoading }: MessageInputProps) {
  const { t } = useI18n();
  const [text, setText] = useState('');

  const submitText = async () => {
    if (!text.trim() || isLoading) return;
    const submittedText = text;
    setText('');
    await onSend(submittedText);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void submitText();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void submitText();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={t('chat.placeholder')}
        aria-label={t('chat.placeholder')}
        rows={6}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="lg"
        aria-label={t('chat.send')}
        disabled={isLoading || !text.trim()}
        isLoading={isLoading}
      >
        <Send size={20} />
      </Button>
    </Form>
  );
}
