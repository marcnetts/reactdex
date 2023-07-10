import { ReactNode } from "react";
import styles from "./Container.module.css";

function Container({ children }: { children: ReactNode }) {
  return <section className={styles.container}>{children}</section>;
}

export default Container;
