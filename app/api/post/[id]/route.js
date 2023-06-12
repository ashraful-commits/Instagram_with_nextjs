import mondoDBconncetion from "@/confige/mongodb";
import Post from "@/modles/postModle";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  try {
    mondoDBconncetion();
    const data = await request.json();

    const id = params.id;
    const post = await Post.findByIdAndUpdate(id, { ...data }, { new: true });
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
