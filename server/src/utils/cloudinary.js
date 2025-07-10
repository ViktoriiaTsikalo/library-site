import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'library-news-videos',
    resource_type: 'video',
    format: async (req, file) => 'mp4', // або залиш без цього
  },
});