import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
  }, [dispatch, post]);
  console.log(posts);
  let recommendedPosts;

  if (posts) recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  const openPost = (_id) => {
    console.log(_id);
    navigate(`/posts/${_id}`);
  };

  if (!post) return null;
  if (isLoading)
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
          <div className={classes.imageSection} md={6}>
            <img
              className={classes.media}
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </div>
        </Grid>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like this
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" alt="logo" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
