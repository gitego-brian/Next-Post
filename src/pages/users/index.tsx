import axios from "axios";
import { GetServerSideProps, NextPageContext } from "next";

const Users = ({ users }: any) => {
  return (
    <div>
      <h1>Wazuuppp users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>);
}

Users.getInitialProps = async ({ req }: NextPageContext) => {
  const cookie = req?.headers.cookie;

  const { data } = await axios.get('http://localhost:3000/api/users', {
    headers: {
      cookie: cookie
    }
  })
  return { users: data.data || data.message }
}

// export const getStaticProps: GetStaticProps = async () => {
//   const resp = await fetch('http://localhost:3000/api/users');
//   const json = await resp.json();
//   return {
//     props: {
//       users: json.data || json.message
//     }
//   };
// }

export default Users;