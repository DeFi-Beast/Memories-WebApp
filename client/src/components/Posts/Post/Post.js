import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, getPosts } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?.googleId || user?.result?._id;
  const hasLiked = likes.find((like) => like === userId);
  

  const handleLike = async () => {
    dispatch(likePost(post._id, navigate));

    if (hasLiked) {
      setLikes(likes.filter((like) => like !== userId));
    } else {
      setLikes([...likes, userId]);
    }
    return likes;
  };
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post?._id}`);
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <div className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          height="194"
          title={post.title}
          alt="hero image"
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post.creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          )}
        </div>
        <div className={classes.overlay2} name="edit">
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post.creator) && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: "white" }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>)}
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id, navigate));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
