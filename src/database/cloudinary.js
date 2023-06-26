import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

// Configura la biblioteca de Cloudinary con tus credenciales
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });



// Sube una imagen a Cloudinary y devuelve la URL
export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'blog',
        });
    }


// Elimina una imagen de Cloudinary
export async function deleteImage(public_id) {
    return await cloudinary.uploader.destroy(public_id);
    }

    

