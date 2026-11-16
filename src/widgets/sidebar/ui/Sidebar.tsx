import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  LogOut,
  Menu,
  MessageSquare,
  MoreVertical,
  PanelLeftClose,
  Settings,
} from 'lucide-react';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/entities/session';
import { useI18n } from '@/shared/lib/i18n';
import { SettingsModal } from '@/features/settings';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Aside = styled.aside<{ $isCollapsed: boolean; $isMobileOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: ${({ $isCollapsed }) => ($isCollapsed ? '4rem' : '260px')};
  height: 100vh;
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '1rem 0.5rem' : '1rem')};
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: width 200ms ease, padding 200ms ease;
  z-index: 50;

  @media (max-width: 768px) {
    width: min(280px, 85vw);
    height: 100vh;
    padding: 1rem;
    z-index: 100;
    transform: translateX(${({ $isMobileOpen }) => ($isMobileOpen ? '0' : '-100%')});
    visibility: ${({ $isMobileOpen }) => ($isMobileOpen ? 'visible' : 'hidden')};
    transition: transform 250ms ease,
      visibility 0s linear ${({ $isMobileOpen }) => ($isMobileOpen ? '0s' : '250ms')};
    box-shadow: ${({ $isMobileOpen }) =>
      $isMobileOpen ? '0 0 24px rgba(0, 0, 0, 0.25)' : 'none'};
  }
`;

const Backdrop = styled.div<{ $visible: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.45);
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
    transition: opacity 250ms ease;
    z-index: 90;
  }
`;

const MobileMenuButton = styled.button<{ $hidden: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    z-index: 60;
    visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
    transition: background-color 150ms ease, opacity 150ms ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.border};
    }
  }
`;

const Header = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'space-between')};
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'flex')};
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ToggleButton = styled(Button)`
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ToggleIcon = styled.span<{ $mirrored: boolean }>`
  display: inline-flex;
  transform: ${({ $mirrored }) => ($mirrored ? 'scaleX(-1)' : 'none')};
  transition: transform 200ms ease;
`;

const IconBox = styled.span<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  & > svg {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const NavItem = styled.button<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  gap: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0.75rem')};
  width: 100%;
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '0.625rem' : '0.625rem 0.75rem')};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.input};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  text-align: left;
  transition: background-color 150ms ease, gap 200ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
  }
`;

const NavLabel = styled.span<{ $isCollapsed: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  max-width: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '100%')};
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 150ms ease, max-width 200ms ease;

  @media (max-width: 768px) {
    max-width: 100%;
    opacity: 1;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

/* ---------- User menu ---------- */

const MenuWrapper = styled.div`
  position: relative;
`;

const Dropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 0;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.125rem;
  min-width: 200px;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 10;

  @media (max-width: 768px) {
    right: 0;
    min-width: 0;
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.input};
  }
`;

const UserButton = styled.button<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  gap: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0.5rem')};
  width: 100%;
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '0.25rem' : '0.5rem')};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  text-align: left;
  transition: background-color 150ms ease, gap 200ms ease, padding 200ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const Avatar = styled.span<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.span<{ $isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  max-width: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '100%')};
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  overflow: hidden;
  transition: opacity 150ms ease, max-width 200ms ease;

  @media (max-width: 768px) {
    max-width: 100%;
    opacity: 1;
  }
`;

const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreIcon = styled.span<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'inline-flex')};
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

/* ---------- Component ---------- */

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { t } = useI18n();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const closeMobile = () => setIsMobileOpen(false);

  useEffect(() => {
    if (!isMobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const displayName = user?.name ?? user?.email ?? 'Пользователь';
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?';
  const avatarUrl = user?.avatarUrl;

  const handleSettings = () => {
    setIsMenuOpen(false);
    closeMobile();
    setIsSettingsOpen(true);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    closeMobile();
    logout();
  };

  return (
    <>
      <MobileMenuButton
        type="button"
        aria-label={t('sidebar.openMenu')}
        aria-controls="app-sidebar"
        aria-expanded={isMobileOpen}
        $hidden={isMobileOpen}
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={20} />
      </MobileMenuButton>

      <Backdrop $visible={isMobileOpen} aria-hidden="true" onClick={closeMobile} />

      <Aside
        id="app-sidebar"
        $isCollapsed={isCollapsed}
        $isMobileOpen={isMobileOpen}
      >
        <Header $isCollapsed={isCollapsed}>
          <Logo $isCollapsed={isCollapsed}>{t('app.name')}</Logo>
          <ToggleButton
            variant="ghost"
            size="sm"
            onClick={onToggle}
            aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          >
            <ToggleIcon $mirrored={isCollapsed}>
              <PanelLeftClose size={18} />
            </ToggleIcon>
          </ToggleButton>
        </Header>

        <Nav>
          <NavItem $isCollapsed={isCollapsed} onClick={closeMobile}>
            <IconBox $size={18}>
              <MessageSquare />
            </IconBox>
            <NavLabel $isCollapsed={isCollapsed}>{t('sidebar.chat')}</NavLabel>
          </NavItem>
        </Nav>

        <Footer>
          <MenuWrapper ref={menuRef}>
            <Dropdown $open={isMenuOpen} role="menu">
              <MenuItem type="button" role="menuitem" onClick={handleSettings}>
                <Settings size={18} />
                <span>{t('sidebar.settings')}</span>
              </MenuItem>
              <MenuItem type="button" role="menuitem" onClick={handleLogout}>
                <LogOut size={18} />
                <span>{t('sidebar.logout')}</span>
              </MenuItem>
            </Dropdown>

            <UserButton
              type="button"
              $isCollapsed={isCollapsed}
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-label={t('sidebar.userMenu')}
            >
              <Avatar $size={32}>
                {avatarUrl ? <img src={avatarUrl} alt="" /> : initials}
              </Avatar>
              <UserInfo $isCollapsed={isCollapsed}>
                <UserName>{displayName}</UserName>
                {user?.email ? <UserEmail>{user.email}</UserEmail> : null}
              </UserInfo>
              <MoreIcon $isCollapsed={isCollapsed}>
                <MoreVertical size={18} />
              </MoreIcon>
            </UserButton>
          </MenuWrapper>
        </Footer>
      </Aside>
      <SettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}