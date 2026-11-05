export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function responseMessage(value: unknown): string | null {
  if (!isRecord(value)) return null;
  const message = value.message ?? value.detail;
  if (typeof message === 'string') return message;
  if (Array.isArray(message)) {
    return message.filter((part): part is string => typeof part === 'string').join('. ');
  }
  return null;
}

export async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, init);
  } catch {
    throw new ApiError('Could not reach the search service.', 0);
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(responseMessage(payload) ?? 'The request could not be completed.', response.status);
  }
  return payload as T;
}
