import mongoose, { Schema, Document } from 'mongoose';



export interface Provider extends Document {
  name:string;
  email: string;
  walletAddress:string
  role:string;
  isVerified:boolean;
  
}

//worker schema
const ProviderSchema: Schema<Provider> = new mongoose.Schema({
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
  walletAddress:{
    type:String,
    required:[true,'WalletAddress is required']
  },
  role:{
    type:String,
    default:'provider'
  },
  isVerified:{
    type:Boolean,
    default:false
  }
  
  
 
},{timestamps:true});

const providerModel =
  (mongoose.models.Provider as mongoose.Model<Provider>) ||
  mongoose.model<Provider>('Provider', ProviderSchema);

export default providerModel;