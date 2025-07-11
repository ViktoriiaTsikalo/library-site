import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './LinkCategoryPage.module.css';
import { AddLinkModal } from '../components/AddLinkModal/AddLinkModal.jsx';

export const LinkCategoryPage = () => {
  const { category } = useParams();
  const [links, setLinks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchLinks = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/links`, {
        params: {
          category,
          page,
          limit: 10,
        },
      });
      if (page === 1) {
        setLinks(res.data.links); // залежить від структури відповіді API
      } else {
        setLinks(prev => [...prev, ...res.data.links]);
      }
      setTotalPages(res.data.totalPages);
    } catch {
      alert('Помилка при завантаженні посилань');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchLinks(1);
  }, [category]);

  useEffect(() => {
    if (page > 1) fetchLinks(page);
  }, [page]);

  const handleLinkAdded = () => {
    setShowModal(false);
    setPage(1);
    fetchLinks(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити це посилання?')) return;
    try {
      await axios.delete(`${API_URL}/api/links/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPage(1);
      fetchLinks(1);
    } catch {
      alert('Помилка при видаленні посилання');
    }
  };

  const titleMap = {
    teachers: 'Посилання для вчителів',
    students: 'Посилання для учнів',
    parents: 'Посилання для батьків',
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>{titleMap[category] || 'Посилання'}</h1>
 {token && (
        <button className={css.addButton} onClick={() => setShowModal(true)}>
          ➕ Додати посилання
        </button>
      )}
      <ul className={css.linkList}>
        {links.map((link) => (
          <li key={link._id} className={css.linkItem}>
            <div className={css.linkContent}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className={css.linkTitle}>
                🔗 {link.title}
              </a>
              {link.grade && <p className={css.meta}>🎓 Клас: {link.grade}</p>}
              {link.author && <p className={css.meta}>✍️ Автор: {link.author}</p>}
              {token && (
                <button className={css.deleteButton} onClick={() => handleDelete(link._id)}>
                  🗑 Видалити
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
{isLoading && (
  <div className={css.loader}>
    <div></div>
  </div>
)}
      {page < totalPages && (
        <button className={css.addButton} onClick={() => setPage(prev => prev + 1)}>
          Показати більше
        </button>
      )}

     
      

      {showModal && (
        <AddLinkModal
          category={category}
          onClose={() => setShowModal(false)}
          onLinkAdded={handleLinkAdded}
        />
      )}
    </div>
  );
};
