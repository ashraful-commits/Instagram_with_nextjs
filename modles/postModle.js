import mongoose from "mongoose";

// Define the schema for an Instagram post
const postSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    caption: {
      type: String,
    },
    photo: {
      type: String,
    },
    likes: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Create the model using the schema
export default mongoose.models.Post || mongoose.model("Post", postSchema);
