import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const { Schema } = mongoose;

dotenv.config();

// Configura la biblioteca de Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Definición del esquema para los artículos del blog
const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: {
    public_id: { type: String },
    secure_url: { type: String },
  },
  createdAt: { type: Date, default: Date.now().toLocaleString('en-US', { timeZone: 'America/Bogota' }) },
  updatedAt: { type: Date, default: Date.now().toLocaleString('en-US', { timeZone: 'America/Bogota' }) },
});


//Definición del esquema para los usuarios
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now().toLocaleString('en-US', { timeZone: 'America/Bogota' })  },
  updatedAt: { type: Date, default: Date.now().toLocaleString('en-US', { timeZone: 'America/Bogota' }) },
});


// Definición del esquema para los comentarios de los artículos
const commentSchema = new Schema({
  articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now().toLocaleString('en-US', { timeZone: 'America/Bogota' }) },
});

// Definición del esquema para la colección de artículos
export const Article = mongoose.model("Article", articleSchema);

// Definición del esquema para la colección de comentarios
export const Comment = mongoose.model("Comment", commentSchema);

// Definición del esquema para la colección de usuarios
export const User = mongoose.model("User", userSchema);