import { linksCollection } from '../../db/models/links.js';

// GET /api/links?category=teachers&page=1&limit=10
export const getLinksByCategory = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  if (!category) {
    return res.status(400).json({ message: 'Вкажіть категорію' });
  }

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);
  const skip = (parsedPage - 1) * parsedLimit;

  const [links, total] = await Promise.all([
    linksCollection
      .find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit),
    linksCollection.countDocuments({ category }),
  ]);

  res.json({
    links,
    total,
    page: parsedPage,
    totalPages: Math.ceil(total / parsedLimit),
  });
};

// POST /api/links
export const createLink = async (req, res) => {
  const { title, url, category, grade, author } = req.body;

  if (!title || !url || !category) {
    return res
      .status(400)
      .json({ message: 'Назва, URL та категорія обовʼязкові' });
  }

  const newLink = await linksCollection.create({
    title,
    url,
    category,
    grade,
    author,
  });

  res.status(201).json(newLink);
};

// DELETE /api/links/:id
export const deleteLink = async (req, res) => {
  const { id } = req.params;

  const deleted = await linksCollection.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Посилання не знайдено' });
  }

  res.json({ message: 'Посилання видалено' });
};
