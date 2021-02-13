import Head from 'next/head';
import Link from 'next/link';

const Index = () => {
  return (
    <div>
      <Head>
        <title>Home - Next Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to My Next Post</h1>
      <ul>
        <li>
          <Link href="/login" passHref><a>Login</a></Link>
        </li>
        <li>
          <Link href="/signup" passHref><a>Signup</a></Link>
        </li>
      </ul>
    </div>
  );
};

export default Index;
