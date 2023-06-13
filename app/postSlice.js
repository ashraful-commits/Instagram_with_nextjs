"use client";

import { createPost, deletePost, editPost, getAllpost } from "./postapi";

const { createSlice } = require("@reduxjs/toolkit");

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllpost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllpost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(getAllpost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = [
          ...state.post.filter((item) => item._id !== action.payload),
        ];
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.post[
          state.post.findIndex((item) => item._id == action.payload._id)
        ] = action.payload;
        state.loading = false;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const getAllState = (state) => state.post;
export default postSlice.reducer;
