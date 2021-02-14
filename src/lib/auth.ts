import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import secrets from '../secrets';

// API-related
export const isAuthed = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.cookies.auth, secrets.JWT_KEY, async (err: any, decoded: any) => {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ error: 'Unauthenticated' });
  });
};

// CLIENT-related
export const logupHandler = async (body: any, isLogin: boolean) => {
  const endpoint = isLogin ? '/api/login' : '/api/signup';
  const res = await fetch(secrets.DOMAIN_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const { error } = await res.json();
  return error;
};
