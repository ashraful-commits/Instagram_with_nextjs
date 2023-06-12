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
          x
        </button>
        <div
          onClick={handleHide}
          className="modal_blar  w-screen h-screen opacity-20 z-20 bg-gray-500 absolute "
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
