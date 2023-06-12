import { NextResponse } from "next/server";
import Post from "@/modles/postModle";
import mondoDBconncetion from "@/confige/mongodb";
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
export const PUT = async (request) => {
  try {
    const data = request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    mondoDBconncetion();
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
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
