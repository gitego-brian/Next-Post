import { LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useUser, useUserPosts } from "../../../lib/hooks";

const Posts = () => {
  const router = useRouter()
  const { user, loading, error } = useUser(router.query.id);
  const { posts, loading: postsLoad, error: postsErr } = useUserPosts(router.query.id)
  if (error) router.replace('/login')
  if (loading) return <LinearProgress />
  return (
    <div>
      <h1>{`${user?.name}'s Posts`}</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>);
}

export default Posts;