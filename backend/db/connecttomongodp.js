import mongoose from "mongoose";

const connecttomongodb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb");
    }catch(error){
      console.error(`Error connecting to mongodb: ${error.message}`);
    }
}

export default connecttomongodb;