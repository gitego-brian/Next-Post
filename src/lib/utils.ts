import secrets from '../secrets';

export const fetcher = async (endpoint: string, config?: any) => {
  const resp = await fetch(`${secrets.DOMAIN_URL}${endpoint}`, config);
  const { data, error } = await resp.json();
  if (resp.status >= 300) return new Error(error);
  return data;
};
