import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './CatalogPage.module.css';
import { AddBookModal } from '../components/AddBookModal/AddBookModal';

const API_URL = import.meta.env.VITE_API_URL;

export const CatalogPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async (page = 1, searchTerm = '') => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/catalog`, {
        params: { page, limit: 20, search: searchTerm },
      });

      if (page === 1) {
        setBooks(res.data.books);
      } else {
        setBooks(prev => [...prev, ...res.data.books]);
      }

      setTotalPages(res.data.totalPages);
    } catch {
      alert('Не вдалося завантажити книги');
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchBooks(1, search);
  }, [search]);

  const handleBookAdded = () => {
    setShowModal(false);
    setPage(1);
    fetchBooks(1, search);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю книгу?')) return;
    try {
      await axios.delete(`${API_URL}/api/catalog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPage(1);
      fetchBooks(1, search);
    } catch {
      alert('Помилка при видаленні книги');
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(nextPage, search);
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>📖 Електронний каталог</h1>

      <input
        className={css.searchInput}
        type="text"
        placeholder="🔍 Пошук книги за назвою..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
{token && (
        <button className={css.addButton} onClick={() => setShowModal(true)}>
          ➕ Додати книгу
        </button>
      )}
      <table className={css.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Автор</th>
            <th>Рік</th>
            {token && <th></th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author || '-'}</td>
              <td>{book.year || '-'}</td>
              {token && (
                <td>
                  <button
                    className={css.deleteButton}
                    onClick={() => handleDelete(book._id)}
                  >
                    🗑
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <div className={css.loader}>
          <div></div>
        </div>
      )}
      {page < totalPages && (
        <button className={css.addButton} onClick={handleLoadMore}>
          📚 Показати більше
        </button>
      )}

      

      {showModal && (
        <AddBookModal onClose={() => setShowModal(false)} onBookAdded={handleBookAdded} />
      )}
    </div>
  );
};

