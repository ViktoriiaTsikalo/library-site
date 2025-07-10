import css from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <p className={css.title}>Бібліотека ЗЗСО «Олениненська гімназія»</p>
        <ul className={css.infoList}>
          <li>
            <strong>Адреса:</strong> Україна, Волинська область, Камінь-Каширський район, с.Оленине, вул. Гряда, 1
          </li>
          <li>
            <strong>Email:</strong> <a href="mailto:svitlanatarasykaga@gmail.com">svitlanatarasykaga@gmail.com</a>
          </li>
        </ul>
        <p className={css.copyright}>© {new Date().getFullYear()} Бібліотека ЗЗСО «Олениненська гімназія»</p>
      </div>
    </footer>
  );
};
