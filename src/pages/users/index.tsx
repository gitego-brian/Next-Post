import { LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useUsers } from "../../lib/hooks";

const Users = () => {
  const router = useRouter()
  const { users, loading, error } = useUsers()
  if (error) router.replace('/login')
  if (loading) return <LinearProgress />
  return (
    <div>
      <h1>Wazuuppp users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>);
}

export default Users;