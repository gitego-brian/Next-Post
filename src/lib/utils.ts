import secrets from '../secrets';

export const fetcher = async (endpoint: string, config?: any) => {
  const resp = await fetch(`${secrets.DOMAIN_URL}${endpoint}`, config);
  const json = await resp.json();
  if (resp.status >= 300) return { error: json.message };
  return { data: json.data };
};
