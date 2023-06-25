import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
