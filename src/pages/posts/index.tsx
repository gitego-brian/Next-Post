import { useRouter } from 'next/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { Post as PostType } from '../../models/post';
import { usePosts } from '../../lib/hooks';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Posts = () => {
  const router = useRouter()
  const classes = useStyles();
  const { posts, error, loading } = usePosts();
  if (error) router.replace('/login')
  if (loading) return <LinearProgress />
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Body</TableCell>
            <TableCell align="right">Owner Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.map((post?: PostType) => (
            <TableRow key={post?.id}>
              <TableCell component="th" scope="row">
                {post?.id}
              </TableCell>
              <TableCell align="right">{post?.title}</TableCell>
              <TableCell align="right">{post?.body}</TableCell>
              <TableCell align="right">{post?.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const { data: posts, error } = await fetcher('/api/posts');
//   return {
//     props: {
//       posts,
//       error,
//     },
//   };
// }
export default Posts;
