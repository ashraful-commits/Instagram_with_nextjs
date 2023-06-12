"use client";
import postReducer from "@/app/postSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export default store;
