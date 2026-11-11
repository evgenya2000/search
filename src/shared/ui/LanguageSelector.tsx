import styled from 'styled-components';
import { Globe } from 'lucide-react';
import { useI18n, type Language } from '@/shared/lib/i18n';

interface LanguageSelectorProps {
  isCollapsed?: boolean;
}

const Wrapper = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 769px) {
    display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'flex')};
  }
`;

const StyledSelect = styled.select`
  flex: 1;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export function LanguageSelector({ isCollapsed = false }: LanguageSelectorProps) {
  const { language, setLanguage, supportedLanguages, languageNames, t } = useI18n();

  return (
    <Wrapper $isCollapsed={isCollapsed} title={t('language.title')}>
      <Globe size={18} aria-hidden />
      <StyledSelect
        aria-label={t('language.title')}
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
      >
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang]}
          </option>
        ))}
      </StyledSelect>
    </Wrapper>
  );
}
