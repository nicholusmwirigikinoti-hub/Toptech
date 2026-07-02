import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

export interface Inspiration {
  id: string;
  type: 'joke' | 'quote';
  text: string;
  author?: string;
  category: string;
}

export interface InspirationResponse {
  success: boolean;
  data: Inspiration;
}

export interface InspirationBatchResponse {
  success: boolean;
  data: Inspiration[];
  count: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Hook to fetch a random inspiration (joke or quote)
 * @returns Query result with random inspiration
 */
export const useRandomInspiration = (): UseQueryResult<Inspiration, Error> => {
  return useQuery<Inspiration, Error>({
    queryKey: ['randomInspiration', Math.random()],
    queryFn: async () => {
      const response = await axios.get<InspirationResponse>(
        `${API_BASE_URL}/api/inspiration/random`
      );
      if (!response.data.success) {
        throw new Error('Failed to fetch inspiration');
      }
      return response.data.data;
    },
  });
};

/**
 * Hook to fetch multiple random inspirations
 * @param count - number of inspirations to fetch
 * @returns Query result with array of inspirations
 */
export const useInspirationBatch = (
  count: number = 10
): UseQueryResult<Inspiration[], Error> => {
  return useQuery<Inspiration[], Error>({
    queryKey: ['inspirationBatch', count],
    queryFn: async () => {
      const response = await axios.get<InspirationBatchResponse>(
        `${API_BASE_URL}/api/inspiration/batch?count=${count}`
      );
      if (!response.data.success) {
        throw new Error('Failed to fetch inspirations');
      }
      return response.data.data;
    },
  });
};

/**
 * Hook to fetch only money and wisdom quotes
 * @param count - number of quotes to fetch
 * @returns Query result with array of quotes
 */
export const useMoneyQuotes = (count: number = 5): UseQueryResult<Inspiration[], Error> => {
  return useQuery<Inspiration[], Error>({
    queryKey: ['moneyQuotes', count],
    queryFn: async () => {
      const response = await axios.get<InspirationBatchResponse>(
        `${API_BASE_URL}/api/inspiration/quotes?count=${count}`
      );
      if (!response.data.success) {
        throw new Error('Failed to fetch quotes');
      }
      return response.data.data;
    },
  });
};
