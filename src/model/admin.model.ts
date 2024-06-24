import mongoose, { Schema, Document } from 'mongoose';



export interface Admin extends Document {
  name:string;
  email: string;
  password: string;
  walletAddress:string;
  role:string;
}

// Updated Admin schema
const AdminSchema: Schema<Admin> = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
 walletAddress:{
  type:String,
  required:[true,'walletAddress is required']
 },
 role:{
  type:String,
  default:'admin'
 }
  
  
 
},{timestamps:true});

const adminModel =
  (mongoose.models.Admin as mongoose.Model<Admin>) ||
  mongoose.model<Admin>('Admin', AdminSchema);

export default adminModel;