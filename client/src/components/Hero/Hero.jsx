import css from './Hero.module.css';
import Librarian from '../../assets/svg/librarian.svg?react';

export const Hero = () => {
  return (
    <div className={css.heroContainer}>
      <div className={css.hero}>
        <h1 className={css.title}>
          БІБЛІОТЕКА ЗАКЛАДУ ЗАГАЛЬНОЇ СЕРЕДНЬОЇ ОСВІТИ "ОЛЕНИНЕНСЬКА ГІМНАЗІЯ"
        </h1>
        <ul className={css.heroList}>
          <li>
            <a className={css.heroListSchedule} href="#schedule-link">
              Графік роботи
            </a>
          </li>
          <li>
            <a className={css.heroListServices} href="#services-link">
              Наші послуги
            </a>
          </li>
          <li className={css.heroListLibrarian}>
            <a className={css.heroListLibrarianLogo} href="#librarian-link">
              <div className={css.heroListLibrarianLink}>
                <span>Бібліотекар</span>
                <div className={css.heroListLibrarianIcon}>
                  <Librarian className={css.iconLibrarian} width="40" height="40" />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
