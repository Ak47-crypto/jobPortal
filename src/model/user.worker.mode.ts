import mongoose, { Schema, Document } from 'mongoose';



export interface Worker extends Document {
  name:string;
  email: string;
  experience:string;
  skills:string;
  walletAddress:string;
  role:string;
  isVerified:boolean;
}

//worker schema
const WorkerSchema: Schema<Worker> = new mongoose.Schema({
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
  experience:{
    type:String,
    required:[true,'Experience is required'],
  },
  skills:{
    type:String,
    required:[true,'Skill is required']
  },
  walletAddress:{
    type:String,
    required:[true,'WalletAddress is required']
  },
  role:{
    type:String,
    default:'worker'
  },
  isVerified:{
    type:Boolean,
    default:false
  }
  
  
 
},{timestamps:true});

const workerModel =
  (mongoose.models.Worker as mongoose.Model<Worker>) ||
  mongoose.model<Worker>('Worker', WorkerSchema);

export default workerModel;