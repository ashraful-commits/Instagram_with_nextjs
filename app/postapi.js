"use client";
const {
  getAlldata,
  createNewData,
  deleteData,
  editData,
} = require("@/libs/getAlldata");
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllpost = createAsyncThunk("post/getAllpost", async () => {
  const allPost = await getAlldata();
  return allPost;
});
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ caption, photo }) => {
    const allPost = await createNewData({ caption, photo });
    console.log(caption, photo);
    return allPost;
  }
);
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  const postId = await deleteData(id);

  return postId;
});
export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ id, data }) => {
    const editNewData = await editData({ id, data });
    console.log(editNewData);
    return editNewData;
  }
);
