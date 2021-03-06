import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import secrets from '../../secrets';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const db = await open('./mydb.sqlite');
    const user = await db.get(`SELECT * FROM users WHERE email=?`, [req.body.email]);
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) res.status(401).json({ error: 'UNAUTHORIZED' });
        else {
          const jwt = sign({ sub: user.id, myUserEmail: user.email }, secrets.JWT_KEY, { expiresIn: '1h' });
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 3600,
              path: '/',
            }),
          );
          res.status(200).json({ message: 'Login successful' });
        }
      });
    } else res.status(404).json({ error: 'Something went wrong' });
  } else res.status(404).json({ error: 'NOT FOUND' });
};
