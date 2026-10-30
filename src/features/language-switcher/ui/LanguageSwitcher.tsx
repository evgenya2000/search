import styled from 'styled-components';
import { Globe } from 'lucide-react';
import { useI18n, languageNames, type Language } from '@/shared/lib';

interface LanguageSwitcherProps {
  isCollapsed?: boolean;
}

const Switcher = styled.div<{ $isCollapsed?: boolean }>`
  display: flex;
  flex-direction: ${({ $isCollapsed }) => ($isCollapsed ? 'column' : 'row')};
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.input};
`;

const Label = styled.span<{ $isCollapsed?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'inline')};
`;

const Options = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Option = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  min-width: 2.25rem;
  height: 1.75rem;
  padding: 0 0.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.surface : 'transparent'};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text : theme.colors.muted)};
  box-shadow: ${({ $isActive, theme }) => ($isActive ? theme.shadows.sm : 'none')};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const IconBox = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.muted};
`;

export function LanguageSwitcher({ isCollapsed = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useI18n();

  return (
    <Switcher $isCollapsed={isCollapsed} role="group" aria-label={t('language.title')}>
      <IconBox aria-hidden>
        <Globe size={16} />
      </IconBox>
      <Label $isCollapsed={isCollapsed}>{t('language.title')}</Label>
      <Options>
        {(Object.keys(languageNames) as Language[]).map((code) => (
          <Option
            key={code}
            $isActive={language === code}
            onClick={() => setLanguage(code)}
            aria-pressed={language === code}
            title={languageNames[code]}
          >
            {code.toUpperCase()}
          </Option>
        ))}
      </Options>
    </Switcher>
  );
}
