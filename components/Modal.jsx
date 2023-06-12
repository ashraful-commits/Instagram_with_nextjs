import React from "react";

const Modal = ({ children, setShow, preview, size }) => {
  const handleHide = () => {
    setShow(false);
  };
  console.log(size);
  return (
    <>
      <div className="modal w-screen flex  justify-center items-center top-0 left-0 fixed  h-screen  z-10 ">
        <button
          onClick={() => setShow(false)}
          className="z-50 absolute top-4 text-2xl text-white right-10"
        >
          <svg
            aria-label="Close"
            class="x1lliihq x1n2onr6"
            color="rgb(255, 255, 255)"
            fill="rgb(255, 255, 255)"
            height="18"
            role="img"
            viewBox="0 0 24 24"
            width="18"
          >
            <title>Close</title>
            <polyline
              fill="none"
              points="20.643 3.357 12 12 3.353 20.647"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            ></polyline>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              x1="20.649"
              x2="3.354"
              y1="20.649"
              y2="3.354"
            ></line>
          </svg>
        </button>
        <div
          onClick={handleHide}
          className="modal_blar  w-screen h-screen opacity-30 z-20 bg-gray-500 absolute "
        ></div>

        <div
          className={`modal_content z-30 w-${size} h-${size} shadow-lg rounded-lg  bg-gray-700 text-white absolute`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
