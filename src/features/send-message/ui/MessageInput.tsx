import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useI18n } from '@/shared/lib';
import { useSendMessage } from '../model/useSendMessage';

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 3rem;
  max-height: 8rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  resize: vertical;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

export function MessageInput() {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const { sendMessage } = useSendMessage();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;
    await sendMessage(text);
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('chat.placeholder')}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button type="submit" size="lg" aria-label={t('chat.send')}>
        <Send size={20} />
      </Button>
    </Form>
  );
}
