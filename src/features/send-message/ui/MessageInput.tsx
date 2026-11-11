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
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TextAreaWrapper = styled.div`
  position: relative;
  display: flex;
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 5rem;
  max-height: 18rem;
  /* снизу резервируем место под кнопку */
  padding: 0.75rem 1rem 4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  resize: none;

  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const SendButtonWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
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
      <TextAreaWrapper>
        <TextArea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t('chat.placeholder')}
          aria-label={t('chat.placeholder')}
          rows={3}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <SendButtonWrapper>
          <Button
            type="submit"
            size="md"
            aria-label={t('chat.send')}
            disabled={isLoading || !text.trim()}
            isLoading={isLoading}
          >
            <Send size={16} />
          </Button>
        </SendButtonWrapper>
      </TextAreaWrapper>
    </Form>
  );
}