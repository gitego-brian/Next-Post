import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import { jwtSecret } from '../../../../secrets';

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
  if (req.method === 'PUT') {
    const statement = await (await db.prepare('UPDATE users SET name=?, email=? where id=?')).run(req.body.name, req.body.email, req.query.id);
    const result = statement.finalize();
    return res.status(201).json({ data: result });
  }
  if (req.method === 'GET') {
    const user = await db.get(`SELECT id, name, email FROM users WHERE id=?`, [req.query.id]);
    return res.status(200).json({ byId: req.query.id, user: user[0] });
  }
  return res.status(404).send('NOT FOUND');
});
