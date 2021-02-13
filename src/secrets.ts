interface Secrets {
  JWT_KEY: any;
  DOMAIN_URL: any;
}
const secrets: Secrets = {
  JWT_KEY: process.env.JWT_KEY,
  DOMAIN_URL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : 'http://localhost:3000',
};

export default secrets;
