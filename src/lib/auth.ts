import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import secrets from '../secrets';

export const isAuthed = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.cookies.auth, secrets.JWT_KEY, async (err: any, decoded: any) => {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ message: 'Unauthenticated' });
  });
};
