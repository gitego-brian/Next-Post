import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import { jwtSecret } from '../../../secrets';

const isAuthed = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.cookies.auth?.split(' ')[1]!, jwtSecret, async (err, decoded) => {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ message: 'Unauthenticated' });
  });
};

export default isAuthed(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(404).json('Not Found');
  const db = await open('./mydb.sqlite');
  const post = await db.get(`SELECT * FROM posts WHERE id=?`, [req.query.id]);
  return res.status(200).json({ byId: req.query.id, post: post[0] });
});
