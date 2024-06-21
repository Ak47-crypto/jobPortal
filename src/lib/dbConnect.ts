import mongoose, { connection } from "mongoose";

type connection = {
  isConnected?: number;
};

const connect: connection = {};

export default async function dbConnect(): Promise<void> {
  if (connect.isConnected) 
    {console.log("db is already connected");
  return}
  try {
    const handleConnection = await mongoose.connect(
      process.env.MONGODB_URI || "",
      {}
    );
    connect.isConnected=handleConnection.connections[0].readyState;
    console.log("db connected");
    
  } catch (error) {
    console.log("error in db connections");
    process.exit(1)
    
  }
}