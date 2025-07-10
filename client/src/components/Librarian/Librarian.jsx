import css from './Librarian.module.css';
import faceImg from '../../assets/images/face.jpg';

export const Librarian = () => {
  return (
    <section className={css.secondSection} id="librarian-link">
      <div className={css.container}>
        <h2 className={css.secondSectionTitle}>Наш бібліотекар</h2>
        <div className={css.librarian}>
          <div className={css.librarianContent}>
            <p className={css.librarianName}>Тарасюк Світлана Василівна</p>
            <address>
              <a
                className={css.librarianMail}
                href="mailto:svitlanatarasykaga@gmail.com"
              >
                svitlanatarasykaga@gmail.com
              </a>
            </address>
            <img
              className={css.imageLibrarianMobile}
              src={faceImg}
              alt="фото бібліотекаря"
            />
            <div className={css.librarianText}>
              <p>
                "Моя головна мета – бути провідником у світі знань, інформації
                та культури для всіх, хто переступає поріг бібліотеки. Моє
                завдання – зробити так, щоб кожен читач зміг знайти тут потрібну
                інформацію, відчути натхнення від прочитаного і відкрити для
                себе щось нове."
              </p>
            </div>
          </div>

          <img
            className={css.imageLibrarianDesktop}
            src={faceImg}
            alt="фото бібліотекаря"
          />
        </div>
      </div>
    </section>
  );
};




