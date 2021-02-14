import { LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { usePost } from "../../lib/hooks";

const Post = () => {
  const router = useRouter();
  const { post, error, loading } = usePost(router.query.id);
  if (error) router.replace('/login')
  if (loading) return <LinearProgress />
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data: posts } = await fetcher('/api/posts');
//   const paths = posts.map((p: PostType) => `/posts/${p.id}`);
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { data: post, error } = await fetcher('/api/posts/' + params?.id);
//   return {
//     props: {
//       post,
//       error
//     },
//   };
// }
export default Post;
