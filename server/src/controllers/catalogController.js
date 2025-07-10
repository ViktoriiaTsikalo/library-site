import { catalogCollection } from '../../db/models/catalog.js';

const getCatalog = async (req, res) => {
  const { page = 1, limit = 20, search = '' } = req.query;

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);
  const skip = (parsedPage - 1) * parsedLimit;

  const searchFilter = search
    ? { title: { $regex: search, $options: 'i' } }
    : {};

  const [books, total] = await Promise.all([
    catalogCollection
      .find(searchFilter)
      .sort({ title: 1 })
      .skip(skip)
      .limit(parsedLimit),
    catalogCollection.countDocuments(searchFilter),
  ]);

  const totalPages = Math.ceil(total / parsedLimit);

  res.json({
    books,
    total,
    page: parsedPage,
    totalPages,
  });
};

const createBook = async (req, res) => {
  const { title, year, author } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ message: 'Назва книги обовʼязкова' });
  }

  const newBook = await catalogCollection.create({ title, year, author });
  res.status(201).json(newBook);
};

const deleteBook = async (req, res) => {
  const deleted = await catalogCollection.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Книгу не знайдено' });
  res.json({ message: 'Книгу видалено' });
};

export default {
  getCatalog,
  createBook,
  deleteBook,
};
