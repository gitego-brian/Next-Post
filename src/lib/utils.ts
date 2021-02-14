import secrets from '../secrets';

export const fetcher = async (endpoint: string, config?: any) => {
  const res = await fetch(`${secrets.DOMAIN_URL}${endpoint}`, config);
  const json = await res.json();
  if (!res.ok) {
    const error: any = new Error(json.error);
    error.status = res.status;
    throw error;
  } else return json.data;
};
