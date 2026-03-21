import { getToken } from './auth';

const API_BASE = import.meta.env.PUBLIC_API_URL || 'http://localhost:5100';

async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}

export interface CardProgressDto {
  cardSlug: string;
  easinessFactor: number;
  interval: number;
  repetitions: number;
  nextReviewUtc: string;
  totalReviews: number;
}

export interface DueCardsResponse {
  dueSlugs: string[];
  notDueSlugs: string[];
}

export async function submitReview(cardSlug: string, quality: number): Promise<CardProgressDto> {
  const res = await authFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({ cardSlug, quality }),
  });
  return res.json();
}

export async function getDueCards(slugs: string[]): Promise<DueCardsResponse> {
  const params = new URLSearchParams({ slugs: slugs.join(',') });
  const res = await authFetch(`/api/due?${params}`);
  return res.json();
}

export async function getProgress(tag?: string): Promise<CardProgressDto[]> {
  const params = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  const res = await authFetch(`/api/progress${params}`);
  return res.json();
}
