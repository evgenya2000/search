import { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from '@/widgets/sidebar';
import { ChatPanel } from '@/widgets/chat-panel';
import { ListingsGrid } from '@/widgets/listings-grid';
import { useSendMessage } from '@/features/send-message';

const Page = styled.main`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  @media (max-width: 768px) { flex-direction: column; }
`;
const Content = styled.div<{ $isSidebarCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  margin-left: ${({ $isSidebarCollapsed }) => ($isSidebarCollapsed ? '4rem' : '260px')};
  overflow-y: auto;
  transition: margin-left 200ms ease;
  @media (max-width: 768px) { margin-left: 0; }
`;

export function ChatPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const search = useSendMessage();

  return (
    <Page>
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed((value) => !value)} />
      <Content $isSidebarCollapsed={isSidebarCollapsed}>
        <ChatPanel onSend={search.sendMessage} isTyping={search.isSearching} />
        <ListingsGrid
          items={search.searchResult?.items ?? []}
          total={search.searchResult?.total ?? 0}
          isLoading={search.isSearching}
          hasSearched={search.hasSearched}
          error={search.searchError?.message ?? null}
        />
      </Content>
    </Page>
  );
}
