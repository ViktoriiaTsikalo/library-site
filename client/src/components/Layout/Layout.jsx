import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppBar } from "../AppBar/AppBar";
import { Footer } from "../Footer/Footer";
import css from "./Layout.module.css";

export const Layout = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash, pathname]);

  return (
    <div className={css.pageWrapper}>
      <AppBar />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

