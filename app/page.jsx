"use client";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import user from "../public/user.png";
import user1 from "../public/user1.jpg";
import user2 from "../public/user2.jpeg";
import user3 from "../public/user3.jpeg";
import user4 from "../public/user4.jpg";
import user5 from "../public/user5.jpeg";
import user6 from "../public/user6.jpg";
import loadingImag from "../public/final (2).gif";
import postImg from "../public/post.png";
import Modal from "@/components/Modal";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, editPost, getAllpost } from "./postapi";
import { getAllState } from "./postSlice";
import axios from "axios";
import swal from "sweetalert";
export const metadata = {
  title: "Home",
  description: "Home is here",
};
export default function Home() {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [size, setSize] = useState("5/12");
  const [preview, setPrview] = useState(null);
  const [dataId, setDataid] = useState(null);
  const [input, setInput] = useState({
    caption: "",
  });
  const { post, loading } = useSelector(getAllState);
  console.log(loading);
  const dispatch = useDispatch();

  //=================================== handle photo
  const handlePhoto = (e) => {
    const files = e.target.files;
    setPhoto(files[0]);
    setPrview(URL.createObjectURL(files[0]));
    setSize("7/12");
  };
  //=================================== handle more option
  const handleMoreOption = (id) => {
    setOption(true);
    setDataid(id);
  };
  //=================================== handle input change
  const handleInput = async (e) => {
    setInput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  //=================================== handle delete
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (loading) {
          swal("Post deleted!", {
            icon: "success",
          });
        }
        dispatch(deletePost(dataId));
        setOption(false);
        setDataid(null);
      } else {
        if (loading) {
          swal("Post safe !");
        }
      }
    });
  };

  //=================================== handle edit
  const handleEdit = () => {
    setShow(true);
    const singleData = post.find((item) => item._id === dataId);
    setPrview(singleData.photo);
    setInput((prevState) => ({
      ...prevState,
      caption: singleData.caption,
    }));
    setOption(false);
  };

  //==================================== handle submite
  const handleSubmite = async (e) => {
    e.preventDefault();
    if (dataId) {
      dispatch(
        editPost({
          id: dataId,
          data: {
            caption: input.caption,
          },
        })
      );

      setPrview(null);
      setShow(false);
      setDataid(null);
      setInput((prevState) => ({
        ...prevState,
        caption: "",
      }));

      swal("Hi!", "Edit post Successfull !", "success");
    } else {
      const formData = new FormData();
      formData.append("file", photo);

      formData.append("upload_preset", "shop_api");
      const url = "https://api.cloudinary.com/v1_1/ds9mljkgj/image/upload";
      await axios.post(url, formData).then((res) => {
        dispatch(
          createPost({
            caption: input.caption,
            photo: `${res.data.secure_url}`,
          })
        );
        setInput((prevState) => ({
          ...prevState,
          caption: "",
        }));
        setDataid(null);
        setPrview(null);
        setShow(false);

        swal("Hi!", "You posted Successfully !", "success");
      });
    }
  };
  //-========================= use effect
  useEffect(() => {
    dispatch(getAllpost());
  }, [dispatch]);
  return (
    <div className="container-fluid bg-black right-0 text-white w-screen  min-h-screen h-auto relative z-0 flex">
      {loading && (
        <Modal setShow={setShow} preview={preview} size={size}>
          <div className="p-52 bg-black">
            <Image
              alt="gif loading"
              src={loadingImag}
              width={100}
              height={100}
              className="z-100"
            />
          </div>
        </Modal>
      )}
      {show && (
        <Modal size={size} setShow={setShow} preview={preview}>
          <form
            className="flex w-full h-full justify-center"
            onSubmit={handleSubmite}
            action=""
          >
            {preview ? (
              <>
                <div className="img_share w-full h-full ">
                  <div className="text-center border-b-2">
                    <button className="font-bold capitalize ">Share</button>
                  </div>
                  <div className="next w-full h-full flex">
                    <Image
                      width={400}
                      height={400}
                      className=" object-contain"
                      src={preview}
                      alt=""
                    />
                    <div className="w-42 px-2">
                      <div className="usr flex w-42 h-42 overflow-hidden gap-3">
                        <Image src={user} width={30} height={30} alt="post" />
                        <p>Username</p>
                      </div>
                      <textarea
                        type="text"
                        placeholder="Write a caption.."
                        name="caption"
                        onChange={handleInput}
                        value={input.caption}
                        cols={20}
                        rows={2}
                        id=""
                        className="mb-10 text-gray-800 px-2 my-3"
                      ></textarea>
                      <div className="smile flex my-2 justify-between">
                        <svg
                          aria-label="Emoji"
                          class="x1lliihq x1n2onr6"
                          color="rgb(168, 168, 168)"
                          fill="#fff"
                          height="20"
                          role="img"
                          viewBox="0 0 24 24"
                          width="20"
                        >
                          <title>Emoji</title>
                          <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                        </svg>
                        <p>0/2,000</p>
                      </div>
                      <div className="location flex my-2 justify-between">
                        <p>Add location</p>
                        <svg
                          aria-label="Add location"
                          class="x1lliihq x1n2onr6"
                          color="rgb(168, 168, 168)"
                          fill="#fff"
                          height="16"
                          role="img"
                          viewBox="0 0 24 24"
                          width="16"
                        >
                          <title>Add location</title>
                          <path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path>
                        </svg>
                      </div>
                      <div className="accibility flex my-2 justify-between">
                        <p>Accecibility</p>
                        <svg
                          aria-label="Down chevron icon"
                          class="x1lliihq x1n2onr6"
                          color="rgb(245, 245, 245)"
                          fill="#fff(245, 245, 245)"
                          height="16"
                          role="img"
                          viewBox="0 0 24 24"
                          width="16"
                        >
                          <title>Down chevron icon</title>
                          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                        </svg>
                      </div>
                      <div className="advanced flex my-2 justify-between">
                        <p>Advanced</p>
                        <svg
                          aria-label="Down chevron icon"
                          class="x1lliihq x1n2onr6"
                          color="rgb(245, 245, 245)"
                          fill="#fff(245, 245, 245)"
                          height="16"
                          role="img"
                          viewBox="0 0 24 24"
                          width="16"
                        >
                          <title>Down chevron icon</title>
                          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-12 w-full text-center">
                  <div className="w-full border-b-2 ">
                    <button className="text-gray-50 w-full capitalize font-bold py-1">
                      Create new post
                    </button>
                  </div>
                  <div className="input px-60 pb-12 pt-44 flex flex-col items-center">
                    <label htmlFor="photo" className="block">
                      <svg
                        aria-label="Icon to represent media such as images or videos"
                        class="x1lliihq x1n2onr6"
                        color="rgb(0, 0, 0)"
                        fill="#fff"
                        height="77"
                        role="img"
                        viewBox="0 0 97.6 77.3"
                        width="96"
                      >
                        <title>
                          Icon to represent media such as images or videos
                        </title>
                        <path
                          d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                          fill="#fff"
                        ></path>
                      </svg>
                    </label>
                    <p className="my-3">Drag photos and vedios here</p>
                    <button className="bg-blue-500 px-4 py-2 text-white rounded-3xl my-10">
                      Select from computer
                    </button>
                    <input
                      className="hidden"
                      onChange={handlePhoto}
                      id="photo"
                      type="file"
                      multiple
                    />
                  </div>
                </div>
              </>
            )}
          </form>
        </Modal>
      )}
      {option && (
        <Modal size={size} setShow={setOption}>
          <div className="more_option flex p-60  flex-col ">
            <button onClick={handleEdit} className="font-bold my-1">
              Edit
            </button>
            <button onClick={handleDelete} className="font-bold my-1">
              Delete
            </button>
          </div>
        </Modal>
      )}
      <div className="left_section fixed flex flex-col gap-10 border w-2/12 h-screen p-4 content-between border-gray-700 ">
        <div className="logo mt-12">
          <svg
            aria-label="Instagram"
            className=""
            color="#fff"
            fill="#fff"
            height="29"
            role="img"
            viewBox="32 4 113 32"
            width="103"
          >
            <path
              clipRule="evenodd"
              d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
              fill="#fff"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="menu">
          <ul className="flex flex-col gap-8">
            <li className="  flex gap-5 items-center space-between   hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                aria-label="Home"
                className=""
                color="#fff"
                fill="#fff"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
              </svg>
              <a>Home</a>
            </li>
            <li className="  flex gap-5 items-center space-between  hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                aria-label="Search"
                className=""
                color="#fff"
                fill="#fff"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                  fill="black"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeidth="2"
                ></path>
                <line
                  fill="#fff"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeidth="2"
                  x1="16.511"
                  x2="22"
                  y1="16.511"
                  y2="22"
                ></line>
              </svg>
              <a>Search</a>
            </li>
            <li className="  flex gap-5 items-center space-between  hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                aria-label="Explore"
                class="_ab6-"
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <polygon
                  fill="none"
                  points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></polygon>
                <polygon
                  fill-rule="evenodd"
                  points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                ></polygon>
                <circle
                  cx="12.001"
                  cy="12.005"
                  fill="none"
                  r="10.5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></circle>
              </svg>
              <a href="">Explore</a>
            </li>
            <li className="  flex gap-5 items-center space-between  hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                aria-label="Reels"
                class="_ab6-"
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="2.049"
                  x2="21.95"
                  y1="7.002"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="13.504"
                  x2="16.362"
                  y1="2.001"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="7.207"
                  x2="10.002"
                  y1="2.11"
                  y2="7.002"
                ></line>
                <path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
                <path
                  d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <a href="">Reels</a>
            </li>
            <li className="  flex gap-5 items-center space-between  hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                aria-label="Share Post"
                class="x1lliihq x1n2onr6"
                color="rgb(168, 168, 168)"
                fill="rgb(168, 168, 168)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Share Post</title>
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"
                ></line>
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></polygon>
              </svg>
              <a href="\">Messages</a>
            </li>
            <li className="  flex gap-5 items-center space-between  hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                aria-label="Notifications"
                className=""
                color="rgb(0, 0, 0)"
                fill="#fff"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
              <a href="">Notifications</a>
            </li>
            <li className="  flex gap-5 items-center space-between  hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                aria-label="New post"
                className=""
                color="rgb(0, 0, 0)"
                fill="#fff"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                  fill="#fff"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeidth="2"
                ></path>
                <line
                  fill="#fff"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeidth="2"
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                ></line>
                <line
                  fill="#fff"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeidth="2"
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                ></line>
              </svg>
              <button onClick={() => setShow(true)} href="">
                Create
              </button>
            </li>
            <li className="  flex gap-5 items-center space-between  hover:bg-gray-800 rounded-full p-2 transition-all">
              <svg
                height="22"
                viewBox="0 0 24 24"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#fff"
                  d="m13.001 18c-.047 0-.094-.004-.142-.013-.406-.078-.674-.47-.596-.877l2-10.5c.077-.408.468-.673.877-.597.406.078.674.47.596.877l-2 10.5c-.068.36-.382.61-.735.61z"
                ></path>
                <path
                  fill="#fff"
                  d="m9.001 18c-.047 0-.094-.004-.142-.013-.406-.078-.674-.47-.596-.877l2-10.5c.077-.408.469-.673.877-.597.406.078.674.47.596.877l-2 10.5c-.068.36-.382.61-.735.61z"
                ></path>
                <path
                  fill="#fff"
                  d="m17.25 15h-10.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                ></path>
                <path
                  fill="#fff"
                  d="m17.25 10.5h-10.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                ></path>
                <path
                  fill="#fff"
                  d="m21.25 24h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v18.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-22.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-18.5c0-.689-.561-1.25-1.25-1.25z"
                ></path>
              </svg>
              <a className="block w-100" href="">
                Generate HashTags
              </a>
            </li>
          </ul>
        </div>
        <div className="profile flex gap-5 items-center space-between">
          <Image
            src={user1}
            alt="user"
            className="rounded-full"
            width={30}
            height={30}
          />
          <a href="">Profile</a>
        </div>
        <div className="menu_icon flex gap-5 mt-20 items-center space-between">
          <svg
            aria-label="Settings"
            className=""
            color="#fff"
            fill="#fff"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <line
              fill="#fff"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeidth="2"
              x1="3"
              x2="21"
              y1="4"
              y2="4"
            ></line>
            <line
              fill="#fff"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeidth="2"
              x1="3"
              x2="21"
              y1="12"
              y2="12"
            ></line>
            <line
              fill="#fff"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeidth="2"
              x1="3"
              x2="21"
              y1="20"
              y2="20"
            ></line>
          </svg>
          <a href="">Menu</a>
        </div>
      </div>
      <div className="right_section mt-12   w-full flex  justify-center ml-42 pl-32 gap-12 ">
        <div className="timeline h-fit ">
          <div className="timeline_users gap-4 flex ">
            <div className="friend_box   rounded-full m-1">
              <div className="friends flex justify-center items-center bg-gradient-to-r from-red-800 via-pink-700 to-yellow-500 border-white p-0.5 rounded-full  ">
                <Image
                  width={63}
                  height={63}
                  className="border-2 w-18 h-18 border-gray-900 rounded-full"
                  src={user1}
                  alt="user"
                />
              </div>
              <p>username</p>
            </div>
            <div className="friend_box   rounded-full m-1">
              <div className="friends flex justify-center items-center bg-gradient-to-r from-red-800 via-pink-700 to-yellow-500 border-white p-0.5 rounded-full  ">
                <Image
                  width={63}
                  height={63}
                  className="border-2 h-16 w-16 border-gray-900 rounded-full"
                  src={user6}
                  alt="user"
                />
              </div>
              <p>username</p>
            </div>
            <div className="friend_box   rounded-full m-1">
              <div className="friends flex justify-center items-center bg-gradient-to-r from-red-800 via-pink-700 to-yellow-500 border-white p-0.5 rounded-full  ">
                <Image
                  width={63}
                  height={63}
                  className="border-2 h-16 w-16 border-gray-900 rounded-full"
                  src={user2}
                  alt="user"
                />
              </div>
              <p>username</p>
            </div>
            <div className="friend_box   rounded-full m-1">
              <div className="friends flex justify-center items-center bg-gradient-to-r from-red-800 via-pink-700 to-yellow-500 border-white p-0.5 rounded-full  ">
                <Image
                  width={63}
                  height={63}
                  className="border-2 h-16 w-16 border-gray-900 rounded-full"
                  src={user3}
                  alt="user"
                />
              </div>
              <p>username</p>
            </div>
            <div className="friend_box   rounded-full m-1">
              <div className="friends flex justify-center items-center bg-gradient-to-r from-red-800 via-pink-700 to-yellow-500 border-white p-0.5 rounded-full  ">
                <Image
                  width={63}
                  height={63}
                  className="border-2 h-16 w-16 border-gray-900 rounded-full"
                  src={user4}
                  alt="user"
                />
              </div>
              <p>username</p>
            </div>
            <div className="friend_box   rounded-full m-1">
              <div className="friends flex justify-center items-center bg-gradient-to-r from-red-800 via-pink-700 to-yellow-500 border-white p-0.5 rounded-full  ">
                <Image
                  width={63}
                  height={63}
                  className="border-2 h-16 w-16 border-gray-900 rounded-full"
                  src={user5}
                  alt="user"
                />
              </div>
              <p>username</p>
            </div>
            <div className="friend_box   rounded-full m-1">
              <div className="friends flex justify-center items-center bg-gradient-to-r from-red-800 via-pink-700 to-yellow-500 border-white p-0.5 rounded-full  ">
                <Image
                  width={63}
                  height={63}
                  className="border-2 h-16 w-16 border-gray-900 rounded-full"
                  src={user}
                  alt="user"
                />
              </div>
              <p>username</p>
            </div>
          </div>
          {post && post.length > 0 ? (
            [...post].reverse().map((item, index) => {
              return (
                <>
                  <div className="text-center">
                    {loading && <p className="text-pink-700">loading...</p>}
                  </div>
                  <div
                    key={index}
                    className="user_post w-12/12 flex relative   flex-col items-center"
                  >
                    <div className="timeline_post border-b border-gray-800 w-8/12 mt-12 ">
                      <div className="post_user ">
                        <div className="user_datials flex  ">
                          <div className="user flex w-full justify-between">
                            <div className="post_user flex gap-3">
                              <Image
                                src={user1}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="user"
                              />
                              <div className="username_time">
                                <p>
                                  mohammad0019 <span>.1h</span>
                                </p>
                                <span className="text-sm">orginal audio</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleMoreOption(item._id)}
                              className="w-22"
                            >
                              <svg
                                aria-label="More options"
                                class="_ab6-"
                                color="rgb(115, 115, 115)"
                                fill="#fff"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="post mt-2">
                        <Image
                          src={item.photo}
                          className="w-full"
                          width={500}
                          height={500}
                          style={{ objectFit: "contain" }}
                          alt="post_img"
                          loading="lazy"
                        />
                      </div>
                      <div className="post_comment my-3 ">
                        <div className="icon flex justify-between my-3 items-center">
                          <div className="sec_1 flex items-center gap-3">
                            <a href="">
                              <svg
                                aria-label="Like"
                                class="x1lliihq x1n2onr6"
                                color="rgb(142, 142, 142)"
                                fill="#fff"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Like</title>
                                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                              </svg>
                            </a>
                            <a href="">
                              <svg
                                aria-label="Comment"
                                class="x1lliihq x1n2onr6"
                                color="rgb(168, 168, 168)"
                                fill="rgb(168, 168, 168)"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Comment</title>
                                <path
                                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                              </svg>
                            </a>
                            <a href="">
                              <svg
                                aria-label="Share Post"
                                class="x1lliihq x1n2onr6"
                                color="rgb(168, 168, 168)"
                                fill="rgb(168, 168, 168)"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Share Post</title>
                                <line
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  x1="22"
                                  x2="9.218"
                                  y1="3"
                                  y2="10.083"
                                ></line>
                                <polygon
                                  fill="none"
                                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                  stroke="currentColor"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></polygon>
                              </svg>
                            </a>
                          </div>
                          <div className="sec_2">
                            <a href="">
                              <svg
                                aria-label="Save"
                                class="x1lliihq x1n2onr6"
                                color="rgb(115, 115, 115)"
                                fill="#fff(115, 115, 115)"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <title>Save</title>
                                <polygon
                                  fill="#fff"
                                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeidth="2"
                                ></polygon>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <h1 className=" w-60 truncate">{item.caption}</h1>
                        <p>emon_farhabe 🖤🥀🖤</p>
                        <p className="text-gray-400 text-sm">
                          View all 4 comments
                        </p>

                        <div className="form flex justify-between">
                          <input
                            className=" text-sm bg-gray-900 py-1 w-full pl-3 my-3 focus:outline-none"
                            type="text"
                            name=""
                            placeholder="Add comments..."
                            id=""
                          />
                          <a href="">
                            <svg
                              aria-label="Emoji"
                              class="x1lliihq x1n2onr6"
                              color="rgb(115, 115, 115)"
                              fill="#fff(115, 115, 115)"
                              height="13"
                              role="img"
                              viewBox="0 0 24 24"
                              width="13"
                            >
                              <title>Emoji</title>
                              <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="text-center my-5">
              <p>No post</p>
            </div>
          )}
        </div>
        <div className="user_profile  w-80">
          <div className="user">
            <div className="user_datials gap-20 justify-between flex">
              <div className="flex items-center gap-5">
                <Image
                  width={80}
                  height={80}
                  src={user1}
                  className="rounded-full"
                  alt="User"
                />
                <div className="datils ">
                  <p className="text-md">Ashraful009</p>
                  <p className="text-md">Asraful Alam</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-white">Switch</button>
            </div>
          </div>
          <div className="user_friends">
            <div className="user_datials my-5 justify-between items-center flex">
              <div className="flex gap-5">
                <p>Suggested for you</p>
              </div>
              <button className="text-white">See all</button>
            </div>
            <div className=" my-2 user_datials gap-20 flex justify-between">
              <div className="flex items-center gap-5 ">
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full"
                  src={user1}
                  alt="User"
                />
                <div className="datils ">
                  <p>Ashraful009</p>
                  <p>Asraful Alam</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm hover:text-white">
                Follow
              </button>
            </div>
            <div className=" my-2 user_datials gap-20 flex justify-between">
              <div className="flex items-center gap-5 ">
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full"
                  src={user2}
                  alt="User"
                />
                <div className="datils ">
                  <p>Ashraful009</p>
                  <p>Asraful Alam</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm hover:text-white">
                Follow
              </button>
            </div>
            <div className=" my-2 user_datials gap-20 flex justify-between">
              <div className="flex items-center gap-5 ">
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full"
                  src={user3}
                  alt="User"
                />
                <div className="datils ">
                  <p>Ashraful009</p>
                  <p>Asraful Alam</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm hover:text-white">
                Follow
              </button>
            </div>
            <div className=" my-2 user_datials gap-20 flex justify-between">
              <div className="flex items-center gap-5 ">
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full"
                  src={user4}
                  alt="User"
                />
                <div className="datils ">
                  <p>Ashraful009</p>
                  <p>Asraful Alam</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm hover:text-white">
                Follow
              </button>
            </div>
            <div className=" my-2 user_datials gap-20 flex justify-between">
              <div className="flex items-center gap-5 ">
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full"
                  src={user5}
                  alt="User"
                />
                <div className="datils ">
                  <p>Ashraful009</p>
                  <p>Asraful Alam</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm hover:text-white">
                Follow
              </button>
            </div>
            <div className="user_datials gap-20 flex justify-between">
              <div className="flex items-center justify-between gap-5 ">
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full"
                  src={user6}
                  alt="User"
                />
                <div className="datils ">
                  <p>Ashraful009</p>
                  <p>Asraful Alam</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm hover:text-white">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
