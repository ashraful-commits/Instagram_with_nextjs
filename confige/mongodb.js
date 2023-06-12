import mongoose from "mongoose";

const mondoDBconncetion = () => {
  try {
    mongoose.connect(process.env.MONGO_SERVER);
    console.log(`Mongodb connceted successfully!`);
  } catch (error) {
    console.log(error.message);
  }
};

export default mondoDBconncetion;
