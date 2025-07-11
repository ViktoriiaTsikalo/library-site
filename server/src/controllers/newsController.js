import { newsCollection as News } from '../../db/models/news.js';
import { getVideoThumbnailUrl } from '../middlewares/upload.js';

export const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [newsList, total] = await Promise.all([
      News.find()
        .sort({ eventDate: -1 })
        .skip(skip)
        .limit(limit),
      News.countDocuments(),
    ]);

    res.json({
      news: newsList,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error in getAllNews:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, description, videoUrl, videoThumbnailUrl, eventDate } = req.body;

    if (!title || !description || !eventDate) {
      return res.status(400).json({ message: 'Обов’язкові поля: заголовок, опис, дата' });
    }

    const eventDateObj = new Date(eventDate);
    if (isNaN(eventDateObj.getTime())) {
      return res.status(400).json({ message: 'Некоректна дата події' });
    }

    let imgUrls = [];

    if (req.files && req.files.length > 0) {
      const { v2: cloudinary } = await import('cloudinary');

      // Завантаження кожного зображення до Cloudinary
      const uploadPromises = req.files.map(file => {
        return cloudinary.uploader.upload(file.path, {
          folder: 'library-news-images',
        });
      });

      const uploadedResults = await Promise.all(uploadPromises);
      imgUrls = uploadedResults.map(result => result.secure_url);
    }

    const newItem = await News.create({
      title,
      description,
      imgUrls,
      videoUrl,
      videoThumbnailUrl,
      eventDate: eventDateObj,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error in createNews:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Новину не знайдено' });
    }

    res.json({ message: 'Новину видалено' });
  } catch (error) {
    console.error('Error in deleteNews:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};

export const uploadNewsVideo = async (req, res) => {
  try {
    console.log('🔥 Вхідний запит: /upload-video');

    if (!req.file) {
      return res.status(400).json({ message: 'Файл відео не знайдено' });
    }

    const videoUrl = req.file.path; // Cloudinary URL
    const publicId = req.file.filename; // Це буде Date.now() + originalname

    const videoThumbnailUrl = getVideoThumbnailUrl(publicId);

    console.log('✅ Prevʼю URL:', videoThumbnailUrl);

    res.status(201).json({ videoUrl, videoThumbnailUrl });
  } catch (error) {
    console.error('Error in uploadNewsVideo:', error);
    res.status(500).json({ message: 'Не вдалося обробити відео' });
  }
};


