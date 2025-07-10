import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'library-videos',
    resource_type: 'video', // дуже важливо для відео!
    format: async (req, file) => 'mp4', // чи інший формат
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

export const uploadVideo = multer({ storage });