import { requestJson } from './http';
import type { FilterOptions, ListingDetail, LoginRequest, LoginResponse, SearchRequest, SearchResponse } from './types';

export function searchListings(request: SearchRequest): Promise<SearchResponse> {
  return requestJson<SearchResponse>('/api/search', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(request),
  });
}

export function getListing(id: number): Promise<ListingDetail> {
  return requestJson<ListingDetail>('/api/listings/' + id);
}

export function getFilterOptions(): Promise<FilterOptions> {
  return requestJson<FilterOptions>('/api/filters');
}

export function login(request: LoginRequest): Promise<LoginResponse> {
  return requestJson<LoginResponse>('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(request),
  });
}
