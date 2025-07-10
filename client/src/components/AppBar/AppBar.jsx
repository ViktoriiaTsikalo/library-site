import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Books from '../../assets/svg/books.svg?react';
import css from "./AppBar.module.css";

export const AppBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

  return (
    <header className={css.header}>
      <NavLink className={css.logo} to="/" onClick={closeMenu}>
        <Books className={css.iconBooks} width="30" height="30" />
        <span>БІБЛІОТЕКА</span>
      </NavLink>

      <button className={css.burger} onClick={toggleMobileMenu} aria-label="Меню">
        <span className={css.bar}></span>
        <span className={css.bar}></span>
        <span className={css.bar}></span>
      </button>

      <nav className={clsx(css.nav, isMobileMenuOpen && css.open)}>
        <div className={css.dropdownWrapper}>
          <NavLink to="/" className={buildLinkClass} onClick={closeMenu}>
            <button className={css.dropdownToggle}>Про бібліотеку</button>
          </NavLink>
          <ul className={css.dropdownMenu}>
            <li><a href="/#librarian-link" className={css.anchorLink} onClick={closeMenu}>Наш бібліотекар</a></li>
            <li><a href="/#directions-link" className={css.anchorLink} onClick={closeMenu}>Напрямки роботи</a></li>
            <li><a href="/#schedule-link" className={css.anchorLink} onClick={closeMenu}>Графік роботи</a></li>
            <li><a href="/#services-link" className={css.anchorLink} onClick={closeMenu}>Наші послуги</a></li>
            <li><a href="/#rules-link" className={css.anchorLink} onClick={closeMenu}>Правила</a></li>
          </ul>
        </div>

        <NavLink to="/news" className={buildLinkClass} onClick={closeMenu}>
          <button>Новини</button>
        </NavLink>

        <div className={css.dropdownWrapper}>
          <NavLink to="/links" className={buildLinkClass} onClick={closeMenu}>
            <button className={css.dropdownToggle}>Корисні посилання</button>
          </NavLink>
          <ul className={css.dropdownMenu}>
            <li><NavLink to="/links/teachers" className={css.anchorLink} onClick={closeMenu}>👩‍🏫 Для вчителів</NavLink></li>
            <li><NavLink to="/links/students" className={css.anchorLink} onClick={closeMenu}>🧒 Для учнів</NavLink></li>
            <li><NavLink to="/links/parents" className={css.anchorLink} onClick={closeMenu}>👨‍👩‍👧 Для батьків</NavLink></li>
          </ul>
        </div>

        <NavLink to="/catalog" className={buildLinkClass} onClick={closeMenu}>
          <button>Електронний каталог</button>
        </NavLink>
      </nav>
    </header>
  );
};
