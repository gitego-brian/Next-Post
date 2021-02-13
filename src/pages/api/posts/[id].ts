import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import { isAuthed } from '../../../lib/auth';

export default isAuthed(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(404).json('Not Found');
  const db = await open('./mydb.sqlite');
  const post = await db.get(`SELECT * FROM posts WHERE id=?`, [req.query.id]);
  return res.status(200).json({ byId: req.query.id, post: post[0] });
});
