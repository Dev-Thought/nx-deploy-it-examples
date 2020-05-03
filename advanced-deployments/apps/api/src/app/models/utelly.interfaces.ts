import { Movie } from '@advanced-deployments/api-interfaces';

export interface UtellyLookupResponse {
  results: Movie[];
  updated: string;
  term: string;
  status_code: number;
  variant: string;
}
