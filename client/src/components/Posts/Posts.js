import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  console.log(posts);

  if (!posts && !isLoading)
    return (
      <Typography variant="h5" style={{ color: "white" }}>
        No Memories Yet <br />
        Sign in to create Your Memories
      </Typography>
    );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
