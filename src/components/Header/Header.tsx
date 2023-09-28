// import React from "react";
import logo_vite from "../../img/logo-vite.png";
import logo_react from "../../img/logo-react.svg";
import logo_ts from "../../img/logo-ts.png";
import logo_gh from "../../img/logo-github.png";
import styles from "./Header.module.css";

export interface HeaderProps {
  prop?: string;
}

export function Header({ prop = "default value" }: HeaderProps) {
  prop;
  return (
    <header className={styles.Header}>
      <h1 className={styles.title}>Reactdex</h1>
      <div className={styles.HeaderIconsGroup}>
        <div className={styles.HeaderIcon}>
          <a href="https://vitejs.dev/" target="blank">
            <img src={logo_vite} alt="Vite" />
          </a>
        </div>
        <div className={styles.HeaderIcon}>
          <a href="https://react.dev/" target="blank">
            <img src={logo_react} alt="React" />
          </a>
        </div>
        <div className={styles.HeaderIcon}>
          <a href="https://www.typescriptlang.org/" target="blank">
            <img src={logo_ts} alt="Typescript" />
          </a>
        </div>
        <div className={styles.HeaderIcon}>
          <a href="https://github.com/marcnetts/reactdex" target="blank">
            <img src={logo_gh} alt="GitHub" />
          </a>
        </div>
      </div>
    </header>
  );
}
