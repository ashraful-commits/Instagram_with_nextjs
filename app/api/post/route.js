import { NextResponse } from "next/server";
import Post from "@/modles/postModle";
import mondoDBconncetion from "@/confige/mongodb";
//======================================= get all data of post
export const GET = async () => {
  try {
    mondoDBconncetion();
    const post = await Post.find();
    // console.log(post);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
//==============================post or create post for instagram
export const POST = async (request) => {
  try {
    mondoDBconncetion();
    const data = await request.json();
    console.log(data);
    const post = await Post.create({ ...data });
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

//================================== delete single data
export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await mondoDBconncetion();
    const post = await Post.findByIdAndDelete(id);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
