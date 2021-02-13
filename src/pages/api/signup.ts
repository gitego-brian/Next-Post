import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) =>
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    if (req.method === 'POST') {
      const db = await open('./mydb.sqlite');
      if (err) return res.status(500).json({ message: 'Signup failed' });
      const result = (
        await (await db.prepare('INSERT INTO users (name, email, password) values(?, ?, ?)')).run(req.body.name, req.body.email, hash)
      ).finalize();
      const newUser = await db.all(`SELECT id, name, email FROM users`);
      return res.status(201).json({ message: 'Signup successful', data: newUser });
    }
    return res.status(404).send('NOT FOUND');
  });
