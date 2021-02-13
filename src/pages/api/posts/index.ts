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
  return res.status(404).json('Not Found');
});
