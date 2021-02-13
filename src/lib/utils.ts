export const fetcher = async (url: string, config: any) => {
  const resp = await fetch(url, config);
  const json = await resp.json();
  if (resp.status >= 300) return { error: json.message };
  return { data: json.data };
};
