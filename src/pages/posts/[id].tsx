import { GetStaticPaths, GetStaticProps } from "next";
import { fetcher } from "../../lib/utils";
import { Post as PostType } from "../../shared/post";
import { PostProps } from "../../shared/Post.props";

const Post = ({ post }: PostProps) => {
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts } = await fetcher('/api/posts');
  const paths = posts.map((p: PostType) => `/posts/${p.id}`);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: post, error } = await fetcher('/api/posts/' + params?.id);
  return {
    props: {
      post,
      error
    },
  };
}
export default Post;
