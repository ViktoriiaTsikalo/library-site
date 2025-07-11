import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Універсальне сховище для фото й відео
const universalStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video/');
    return {
      folder: isVideo ? 'library-news-videos' : 'library-news-images',
      resource_type: isVideo ? 'video' : 'image',
      format: isVideo ? 'mp4' : undefined,
      public_id: Date.now() + '-' + file.originalname,
    };
  },
});

// ✅ Multer middleware
export const uploadUniversal = multer({ storage: universalStorage });

// ✅ Додатково: утиліта для створення превʼю з Cloudinary
export const getVideoThumbnailUrl = (publicId) => {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    start_offset: 1,
    width: 400,
    crop: 'scale',
  });
};
