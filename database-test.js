const { open } = require('sqlite');

const setup = async () => {
  const db = await open('./mydb.sqlite');
  await db.migrate({ force: 'last' });
};

setup();