import { fetcher } from './utils';
import useSWR from 'swr';

export function useUsers() {
  const { data, error } = useSWR('/api/users', fetcher);
  return {
    users: data,
    loading: !error && !data,
    error: error?.message,
  };
}

export function usePosts() {
  const { data, error } = useSWR('/api/posts', fetcher);
  return {
    posts: data,
    loading: !error && !data,
    error: error?.message,
  };
}

export function useUser(id: any) {
  const { data, error } = useSWR('/api/users/' + id, fetcher);
  return {
    user: data,
    loading: !error && !data,
    error: error?.message,
  };
}

export function usePost(id: any) {
  const { data, error } = useSWR('/api/posts/' + id, fetcher);
  return {
    post: data.data,
    loading: !error && !data,
    error: error?.message,
  };
}

export function useUserPosts(id: any) {
  const { data, error } = useSWR('/api/users/' + id + '/posts/', fetcher);
  return {
    posts: data,
    loading: !error && !data,
    error: error?.message,
  };
}
