import { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import {useDispatch} from "react-redux"
import { useRef } from "react";
import useStyles from "./styles"
import { commentPost } from "../../actions/posts";

const CommentSection = ({post}) => {

    
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comment , setComment] = useState('')
    const [comments , setComments] = useState(post?.comments)
    
    const commentsRef = useRef()
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleClick = async () => {
        const finalComment = `${user?.result?.name} : ${comment}`
        // console.log(post._id)
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')
        commentsRef.current.scrollIntoView({scroll:"smooth"})
    }

  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variants="h6">Comments</Typography>
                {comments.map((c, i) => (
                    <Typography key={i} gutterBottom variants="subtitle1">
                        <strong>{c.split(':')[0]}</strong> :
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentsRef}></div>
            </div>
            {user?.result?.name && (
                <div style={{width:"70%"}}>
                <Typography gutterBottom variants="h6">Write A Comment</Typography>
                <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={e => setComment(e.target.value)}
                />
                <Button style={{marginTop:'10px'}} color='primary' fullWidth disabled={!comment} variant="contained" onClick={handleClick}>
                    Comment
                </Button>
            </div>
            )}
            
        </div>

    </div>
  )
}

export default CommentSection