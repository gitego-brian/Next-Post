import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import { isAuthed } from '../../../lib/auth';

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
