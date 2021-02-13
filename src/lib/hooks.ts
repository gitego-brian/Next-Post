import { fetcher } from './utils';
import useSWR from 'swr';

export const useUsers = () => {
  const { data, error } = useSWR('/api/users', fetcher);
  return {
    users: data,
    loading: !error && !data,
    error: error,
  };
};
