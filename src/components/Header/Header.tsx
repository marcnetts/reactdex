import React from "react";

import styles from "./Header.module.css";

export interface HeaderProps {
  prop?: string;
}

export function Header({ prop = "default value" }: HeaderProps) {
  return (
    <header className={styles.Header}>
      <h1 className={styles.title}>Reactdex</h1>
      <div className={styles.HeaderIconsGroup}>
        <div className={styles.HeaderIcon}>
          <a href="https://vitejs.dev/">
            <img src="https://vitejs.dev/logo-with-shadow.png" alt="Vite" />
          </a>
        </div>
        <div className={styles.HeaderIcon}>
          <a href="https://react.dev/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" alt="React" />
          </a>
        </div>
        <div className={styles.HeaderIcon}>
          <a href="https://www.typescriptlang.org/">
            <img src="https://raw.githubusercontent.com/rmolinamir/typescript-cheatsheet/master/TypeScript.png" alt="Typescript" />
          </a>
        </div>
        <div className={styles.HeaderIcon}>
          <a href="https://github.com/marcnetts/reactdex">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
          </a>
        </div>
      </div>
    </header>
  );
}
