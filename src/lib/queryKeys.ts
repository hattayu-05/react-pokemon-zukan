// src/lib/queryKeys.ts
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const queries = createQueryKeyStore({
  pokemon: {
    all: null,
    lists: () => ['list'],
    list: (filters: { offset?: number; limit?: number }) => [filters],
    details: () => ['detail'],
    detail: (id: number) => [id],
    species: (id: number) => ['species', id],
  },
});
