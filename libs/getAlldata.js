"use client";
import axios from "axios";

//========================= get all data
export const getAlldata = async () => {
  const response = await axios.get("http://localhost:3000/api/post");
  if (!response.data) throw new Error("No data found");
  return response.data.post;
};
//========================= create
export const createNewData = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/api/post", data);

    if (!response.data) throw new Error("No data found");
    return response.data.post;
  } catch (error) {
    // return error.message;
    console.log(error.message);
  }
};
//========================= delete
export const deleteData = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/post?id=${id}`
    );
    if (!response.data) throw new Error("No data found");
    return id;
  } catch (error) {
    return error.message;
  }
};
//========================= edit
export const editData = async ({ id, data }) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/post/${id}`,
      data
    );
    if (!response.data) throw new Error("No data found");

    return response.data.post;
  } catch (error) {
    return error.message;
  }
};
