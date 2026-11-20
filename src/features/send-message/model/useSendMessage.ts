import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useChatStore } from '@/entities/chat';
import { searchListings, type SearchRequest, type SearchResponse } from '@/shared/api';
import { useI18n } from '@/shared/lib';

const latestResultKey = ['land-search', 'latest-result'] as const;

interface UseSendMessageResult {
  sendMessage: (text: string) => Promise<void>;
  searchResult: SearchResponse | undefined;
  isSearching: boolean;
  hasSearched: boolean;
  searchError: Error | null;
  scrollToMessageId: string | null;
}

export function useSendMessage(): UseSendMessageResult {
  const addMessage = useChatStore((state) => state.addMessage);
  const [scrollToMessageId, setScrollToMessageId] = useState<string | null>(null);
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const latestResult = useQuery<SearchResponse | null>({
    queryKey: latestResultKey,
    queryFn: async () => null,
    initialData: null,
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const mutation = useMutation({
    mutationKey: ['land-search', 'search'],
    mutationFn: searchListings,
    retry: false,
    onSuccess: (result) => {
      if (result.status === 'completed') queryClient.setQueryData(latestResultKey, result);
    },
  });
  const { mutateAsync } = mutation;

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage({ role: 'user', text: trimmed });

    try {
      const request: SearchRequest = { query: trimmed };
      const result = await mutateAsync(request);
      const responseMessageId = addMessage({ role: 'assistant', text: result.answer });
      setScrollToMessageId(responseMessageId);
    } catch (error) {
      addMessage({
        role: 'assistant',
        text: error instanceof Error ? error.message : t('search.failed'),
      });
    }
  }, [addMessage, mutateAsync, t]);

  const latestSearchResult = mutation.data?.status === 'completed' ? mutation.data : undefined;

  return {
    sendMessage,
    searchResult: latestResult.data ?? latestSearchResult,
    isSearching: mutation.isPending,
    hasSearched: latestResult.data !== null || latestSearchResult !== undefined || mutation.isPending || mutation.isError,
    searchError: mutation.error,
    scrollToMessageId,
  };
}
