import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';

const { Schema } = mongoose;

dotenv.config();


// Configura la biblioteca de Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/*
const connectCloudinary = async () => {
  try {
    await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg');
    console.log('Conexión con Cloudinary exitosa');
  } catch (error) {
    console.log(error);
  }
};
connectCloudinary();
*/




// Definición del esquema para los artículos del blog
const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware para subir la imagen a Cloudinary antes de guardar el artículo
articleSchema.pre('save', async function (next) {
  if (this.isModified('imageUrl')) {
    try {
      // Sube la imagen a Cloudinary y obtén la URL
      const result = await cloudinary.uploader.upload(this.imageUrl);
      this.imageUrl = result.secure_url;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

// Definición del esquema para los comentarios de los artículos
const commentSchema = new Schema({
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Definición del esquema para la colección de artículos
export const Article = mongoose.model('Article', articleSchema);

// Definición del esquema para la colección de comentarios
export const Comment = mongoose.model('Comment', commentSchema);

