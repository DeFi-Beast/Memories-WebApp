import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { getPosts } from "../actions/posts";

import { Link } from "react-router-dom";
const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  console.log(page);
  
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/posts?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Paginate;
