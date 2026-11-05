import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useChatStore } from '@/entities/chat';
import { searchListings, type SearchRequest, type SearchResponse } from '@/shared/api';
import { useI18n } from '@/shared/lib';

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

interface UseSendMessageResult {
  sendMessage: (text: string) => Promise<void>;
  searchResult: SearchResponse | undefined;
  isSearching: boolean;
  hasSearched: boolean;
  searchError: Error | null;
}

export function useSendMessage(): UseSendMessageResult {
  const addMessage = useChatStore((state) => state.addMessage);
  const { t } = useI18n();
  const mutation = useMutation({
    mutationKey: ['land-search', 'search'],
    mutationFn: searchListings,
    retry: false,
  });

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage({ role: 'user', text: trimmed });

    let value: unknown;
    try {
      value = JSON.parse(trimmed);
    } catch {
      addMessage({ role: 'assistant', text: t('search.invalidJson') });
      return;
    }
    if (!isRecord(value) || !isRecord(value.filter)) {
      addMessage({ role: 'assistant', text: t('search.invalidRequest') });
      return;
    }

    try {
      const result = await mutation.mutateAsync(value as SearchRequest);
      addMessage({ role: 'assistant', text: t('search.found', { count: String(result.total) }) });
    } catch (error) {
      addMessage({
        role: 'assistant',
        text: error instanceof Error ? error.message : t('search.failed'),
      });
    }
  }, [addMessage, mutation.mutateAsync, t]);

  return {
    sendMessage,
    searchResult: mutation.data,
    isSearching: mutation.isPending,
    hasSearched: mutation.isPending || mutation.isSuccess || mutation.isError,
    searchError: mutation.error,
  };
}
