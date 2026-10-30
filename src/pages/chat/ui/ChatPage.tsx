import { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from '@/widgets/sidebar';
import { ChatPanel } from '@/widgets/chat-panel';
import { ListingsGrid } from '@/widgets/listings-grid';

const Page = styled.main`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div<{ $isSidebarCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  margin-left: ${({ $isSidebarCollapsed }) => ($isSidebarCollapsed ? '4rem' : '260px')};
  overflow-y: auto;
  transition: margin-left 200ms ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export function ChatPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <Page>
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <Content $isSidebarCollapsed={isSidebarCollapsed}>
        <ChatPanel />
        <ListingsGrid />
      </Content>
    </Page>
  );
}
