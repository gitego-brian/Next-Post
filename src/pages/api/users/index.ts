import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import { jwtSecret } from '../../../secrets';

const isAuthed = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.cookies.auth, jwtSecret, async (err, decoded) => {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ message: 'Unauthenticated' });
  });
};

export default isAuthed(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).json('Not Found');
  }
  const db = await open('./mydb.sqlite');
  const users = await db.get('SELECT id,name,email FROM users');

  return res.status(200).json({
    message: 'People',
    data: users,
  });
});
