import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import css from './MediaGalleryModal.module.css';

Modal.setAppElement('#root');

export const MediaGalleryModal = ({ isOpen, onClose, mediaItems = [], startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  if (!isOpen || !mediaItems?.length) return null;

  const current = mediaItems[currentIndex];
  if (!current) return null;

  const isVideo = current.type === 'video';

  const prev = () => setCurrentIndex((currentIndex + mediaItems.length - 1) % mediaItems.length);
  const next = () => setCurrentIndex((currentIndex + 1) % mediaItems.length);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      contentLabel="Галерея медіа"
    >
      <button className={css.closeBtn} onClick={onClose}>✖</button>
      <div className={css.content}>
        <button className={css.navBtn} onClick={prev}>←</button>
        <div className={css.mediaWrapper}>
          {isVideo ? (
            <div className={css.playerWrapper}>
              <ReactPlayer
                url={current.url}
                controls
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <img src={current.url} alt="" className={css.mediaImage} />
          )}
        </div>
        <button className={css.navBtn} onClick={next}>→</button>
      </div>
    </Modal>
  );
};
