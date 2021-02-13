import { fetcher } from './utils';
import useSWR from 'swr';
import { User } from '../shared/user';
import { Post } from '../shared/post';

export function useUsers() {
  const { data, error }: { data?: User[]; error?: string } = useSWR('/api/users', fetcher);
  return {
    users: data,
    loading: !error && !data,
    error: error,
  };
}

export function usePosts() {
  const { data, error }: { data?: Post[]; error?: string } = useSWR('/api/posts', fetcher);
  return {
    posts: data,
    loading: !error && !data,
    error: error,
  };
}

export function useUser(id: any) {
  const { data, error }: { data?: User; error?: string } = useSWR('/api/users/' + id, fetcher);
  return {
    user: data,
    loading: !error && !data,
    error: error,
  };
}

export function usePost(id: any) {
  const { data, error }: { data?: Post; error?: string } = useSWR('/api/posts/' + id, fetcher);
  return {
    post: data,
    loading: !error && !data,
    error: error,
  };
}

export function useUserPosts(id: any) {
  const { data, error }: { data?: Post[]; error?: string } = useSWR('/api/users/' + id + '/posts/', fetcher);
  return {
    posts: data,
    loading: !error && !data,
    error: error,
  };
}
