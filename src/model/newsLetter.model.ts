import mongoose, { Schema, Document } from "mongoose";

export interface NewsLetter extends Document {
  email: string;
}

// Updated Admin schema
const NewsLetterSchema: Schema<NewsLetter> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
  },
  { timestamps: true }
);

const newsLetterModel =
  (mongoose.models.NewsLetter as mongoose.Model<NewsLetter>) ||
  mongoose.model<NewsLetter>("NewsLetter", NewsLetterSchema);

export default newsLetterModel;
