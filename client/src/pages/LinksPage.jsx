import { useNavigate } from 'react-router-dom';
import css from './LinksPage.module.css';

export const LinksPage = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/links/${category}`);
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Корисні посилання</h1>

      <div className={css.buttons}>
        <button className={css.linkButton} onClick={() => handleClick('teachers')}>
          👩‍🏫 Для вчителів
        </button>
        <button className={css.linkButton} onClick={() => handleClick('students')}>
          🧒 Для здобувачів освіти
        </button>
        <button className={css.linkButton} onClick={() => handleClick('parents')}>
          👨‍👩‍👧 Для батьків
        </button>
      </div>
    </div>
  );
};
