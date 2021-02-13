import { LinearProgress } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePost } from "../../lib/hooks";
import { fetcher } from "../../lib/utils";
import { Post as PostType } from "../../shared/post";
import { PostProps } from "../../shared/Post.props";

const Post = () => {
  const router = useRouter();
  const { post, error, loading } = usePost(router.query.id);

  useEffect(() => {
    if (error) router.replace('/login')
  }, [])
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
