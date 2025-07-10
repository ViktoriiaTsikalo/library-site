
import { AddNewsForm } from '../AddNewsForm/AddNewsForm';
import css from './AddNewsModal.module.css';

export const AddNewsModal = ({ isOpen, onClose, onNewsAdded }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>✖</button>
        <AddNewsForm onNewsAdded={onNewsAdded} />
      </div>
    </div>
  );
};
