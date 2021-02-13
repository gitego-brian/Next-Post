import { GetStaticPaths, GetStaticProps } from "next";
import { Post as PostType } from "../../shared/post";
import { PostProps } from "../../shared/Post.props";

const Post = ({ post }: PostProps) => {
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const posts: PostType[] = await (await fetch('/api/posts')).json();
  // const paths = posts.map((p) => `/posts/${p.id}`);
  return {
    paths: [],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const post = await (await fetch('/api/posts/' + params?.id)).json();

  return {
    props: {
      post: {},
    },
  };
}
export default Post;
