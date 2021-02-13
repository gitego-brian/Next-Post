import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import { isAuthed } from '../../../lib/auth';

export default isAuthed(async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await open('./mydb.sqlite');
  if (req.method === 'GET') {
    const posts = await db.get('SELECT * FROM posts');
    return res.status(200).json({
      message: 'Posts',
      data: posts,
    });
  }
  if (req.method === 'POST') {
    const statement = await (await db.prepare('INSERT INTO posts (title, body, userId) values (?, ?, ?)')).run(
      req.body.title,
      req.body.body,
      req.body.userId,
    );
    const result = statement.finalize();
    return res.status(201).json({ data: result });
  }
  return res.status(404).json({ error: 'Not Found' });
});
