import mongoose from "mongoose";

const connecttomongodb = async () => {
    try{
        const uri = process.env.MONGO_URI ?? process.env.MONGO_CONNECTION_STRING;
        await mongoose.connect(uri);
        console.log("connected to mongodb");
    }catch(error){
      console.error(`Error connecting to mongodb: ${error.message}`);
    }
}

export default connecttomongodb;