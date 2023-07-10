import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.Footer}>
      @{currentYear} <a href="https://marcnetts.github.io/">Marcnetts</a> - <a href="https://github.com/marcnetts">GitHub</a> - <a href="https://www.linkedin.com/in/marcos-zanetti/">Linkedin</a>
    </footer>
  );
}
