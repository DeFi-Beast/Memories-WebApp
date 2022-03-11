import { FETCH_ALL,COMMENT,FETCH_POST,START_LOADING,END_LOADING,FETCH_BY_SEARCH, DELETE, UPDATE, LIKE, CREATE } from "../constants/actionTypes";
import * as api from "../api";

export const getPost = (id) => async (dispatch) => {
  try {
    //   console.log(page)
    dispatch({type:START_LOADING})
    const { data } = await api.fetchPost(id);
    console.log(data)
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type:END_LOADING})

  } catch (error) {
    console.log(error);
  }
};
export const getPosts = (page) => async (dispatch) => {
  try {
    //   console.log(page)
    dispatch({type:START_LOADING})
    const { data } = await api.fetchPosts(page);
    console.log(data)
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type:END_LOADING})

  } catch (error) {
    console.log(error);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
    dispatch({type:START_LOADING})

    const { data :{data} } = await api.fetchPostsBySearch(searchQuery);
    // console.log(data)
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({type:END_LOADING})

  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    navigate(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {}
};
export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    await api.deletePost(id);
    navigate("/")
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
    // navigate("/")

  } catch (error) {}
};
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value,id);

    dispatch({ type: COMMENT, payload: data });
    
    return data.comments

  } catch (error) {}
};
