import { ReactNode } from "react";
import styles from "./MonType.module.css";

export interface TypeProps {
  type: string;
}

const _color_types = {
  'normal': '#CBCBCB',
  'psychic': '#E986CD',
  'flying': '#86E9D1',
  'grass': '#8EE986',
  'poison': '#CF86E9',
  'fire': '#F45F5F',
  'electric': '#E9C134',
  'water': '#349DE9',
  'fighting': '#F9AC38',
  'ice': '#70EFE0',
  'rock': '#875E20',
  'ground': '#C07C2B',
  'ghost': '#6334E9',
  'dragon': '#CF34E9',
  'metal': '#868686',
  'dark': '#171717',
  'fairy': '#EF56D7',
  '???': '#68A090'
}

function MonType({ type = "???" }: TypeProps) {
  return (<span className={styles.mon_type} style={{backgroundColor: _color_types[type as keyof object]}}>
    {type.toUpperCase()}
  </span>);
}

export default MonType;
