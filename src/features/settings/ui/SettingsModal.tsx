import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { LanguageSelector } from '@/shared/ui';
import { useI18n } from '@/shared/lib/i18n';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

const Dialog = styled.div`
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.input};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  overflow-y: auto;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.75;
`;

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <Backdrop onClick={onClose}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Title id="settings-modal-title">{t('sidebar.settings')}</Title>
          <CloseButton
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <X size={18} />
          </CloseButton>
        </Header>
        <Body>
          <Field>
            <FieldLabel>{t('language.title')}</FieldLabel>
            <LanguageSelector isCollapsed={false} />
          </Field>
        </Body>
      </Dialog>
    </Backdrop>,
    document.body,
  );
}