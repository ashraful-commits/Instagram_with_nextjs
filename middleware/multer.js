import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public");
  },
  filename: (req, file, cb) => {
    cb(null, req.file.originalname);
  },
});

const singlePhoto = multer({
  storage,
}).single("photo");

export default singlePhoto;
