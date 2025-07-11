import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './PostList.module.css';
import { AddNewsModal } from '../AddNewsModal/AddNewsModal.jsx';
import { MediaGalleryModal } from '../MediaGalleryModal/MediaGalleryModal.jsx';

const API_URL = import.meta.env.VITE_API_URL;

export const PostList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [galleryData, setGalleryData] = useState({ open: false, items: [], startIndex: 0 });
  const token = localStorage.getItem('token');

  const fetchNews = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/news?page=${page}&limit=10`);
      setNewsList(page === 1 ? res.data.news : prev => [...prev, ...res.data.news]);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Помилка завантаження новин:', error);
    }finally {
    setIsLoading(false);
  }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити новину?')) return;
    try {
      await axios.delete(`${API_URL}/api/news/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPage(1);
      fetchNews(1);
    } catch {
      alert('Помилка при видаленні новини');
    }
  };

  const handleNewsAdded = () => {
    setIsNewsModalOpen(false);
    setPage(1);
    fetchNews(1);
  };

  const openGallery = (imgUrls = [], videoUrl, clickedIndex = 0) => {
    const mediaItems = [
      ...(imgUrls || []).map((url) => ({ type: 'image', url: `${API_URL}${url}` })),
      ...(videoUrl ? [{ type: 'video', url: videoUrl }] : [])
    ];
    setGalleryData({
      open: true,
      items: mediaItems,
      startIndex: clickedIndex
    });
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Новини бібліотеки</h1>
      {token && (
        <button className={css.button} onClick={() => setIsNewsModalOpen(true)}>
          ➕ Додати новину
        </button>
      )}

      <div className={css.newsList}>
        {newsList.map((news) => (
          <div key={news._id} className={css.newsItem}>
            <h3 className={css.newsHeadline}>{news.title}</h3>
            <p className={css.newsText}>{news.description}</p>

            {(news.imgUrls?.length > 0 || news.videoUrl) && (
              <div className={css.mediaGallery}>
                {news.imgUrls?.map((url, i) => (
                  <img
                    key={`img-${i}`}
                    className={css.mediaItem}
                    src={`${API_URL}${url}`}
                    alt={`Зображення ${i + 1}`}
                    onClick={() => openGallery(news.imgUrls, news.videoUrl, i)}
                  />
                ))}

                {news.videoUrl && (
                  <div
                    key="video"
                    className={`${css.mediaItem} ${css.videoWrapper}`}
                    onClick={() => openGallery(news.imgUrls, news.videoUrl, news.imgUrls?.length || 0)}
                  >
                    <img
                      src={news.videoThumbnailUrl || '/video-placeholder.jpg'}
                      alt="Превʼю відео"
                      className={css.videoThumbnail}
                    />
                    <div className={css.playIcon}>▶</div>
                  </div>
                )}
              </div>
            )}

            <p className={css.date}>
              📅 {new Date(news.eventDate).toLocaleDateString()}
            </p>

            {token && (
              <button className={css.deleteButton} onClick={() => handleDelete(news._id)}>
                🗑 Видалити
              </button>
            )}
          </div>
        ))}
      </div>
{isLoading && (
  <div className={css.loader}>
    <div></div>
  </div>
)}
      {page < totalPages && (
        <button className={css.button} onClick={() => setPage(prev => prev + 1)}>
          Показати більше
        </button>
      )}

      <AddNewsModal
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        onNewsAdded={handleNewsAdded}
      />

      <MediaGalleryModal
        isOpen={galleryData.open}
        mediaItems={galleryData.items}
        startIndex={galleryData.startIndex}
        onClose={() => setGalleryData({ ...galleryData, open: false })}
      />
    </div>
  );
};
