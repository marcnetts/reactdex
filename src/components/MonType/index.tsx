import { ReactNode } from "react";
import styles from "./MonType.module.css";

export interface TypeProps {
  type: string;
}

function MonType({ type = "???" }: TypeProps) {
  // return (<div className={styles.mon_type} style={{backgroundColor: 'white'}}>
  return (<div className={styles.mon_type}>
    {type.toUpperCase()}
  </div>);
}

export default MonType;
