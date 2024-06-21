import mongoose, { Schema, Document } from 'mongoose';



export interface Admin extends Document {
  
  email: string;
  password: string;
  
}

// Updated Admin schema
const AdminSchema: Schema<Admin> = new mongoose.Schema({

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
 
  
  
  
 
});

const adminModel =
  (mongoose.models.Admin as mongoose.Model<Admin>) ||
  mongoose.model<Admin>('Admin', AdminSchema);

export default adminModel;