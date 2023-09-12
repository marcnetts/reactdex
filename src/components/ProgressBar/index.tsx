import styles from "./ProgressBar.module.css";

export interface TypeProps {
  progress?: number;
  color?: string;
}

function ProgressBar({ progress = 0, color = "#CCC" }: TypeProps) {
  return (
    <div className={styles.progbar}>
      <div className={styles.progbar_fill} style={{width: `${Math.min(progress, 100)}%`, backgroundColor: color}}></div>
    </div>
  );
}

export default ProgressBar;
