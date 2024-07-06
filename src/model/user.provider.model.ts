import { jobSchema } from "@/schemas/jobSchema";
import mongoose, { Schema, Document } from "mongoose";

export interface Job extends Document {
  provider: string;
  jobId: number;
  title: string;
  location: string;
  salary: string;
  description: string;
  isActive:boolean;
  timestamp: string;
}

export interface Provider extends Document {
  name: string;
  email: string;
  walletAddress: string;
  role: string;
  isVerified: boolean;
  job: Job[];
}

// job schema
const JobSchema: Schema<Job> = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  jobId: {
    type: Number,
    required: true,
    unique:true
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean,
    required:true,
    default:true
  },
  timestamp: {
    type: String,
    required: true,
  },
});

//worker schema
const ProviderSchema: Schema<Provider> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    walletAddress: {
      type: String,
      required: [true, "WalletAddress is required"],
    },
    role: {
      type: String,
      default: "provider",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    job: [JobSchema],
  },
  { timestamps: true }
);

const providerModel =
  (mongoose.models.Provider as mongoose.Model<Provider>) ||
  mongoose.model<Provider>("Provider", ProviderSchema);

export default providerModel;
