'use client'
import { font } from "./font";
import styles from "./header.module.scss";
import { Switch } from "@nextui-org/react";
import { useLocalStore } from "../utils/store/store";
export function Header() {
    const setTheme = useLocalStore((state) => state.setTheme);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.item1}>
          <h2 className={font.className}>What is the world ? </h2>
        </div>
        <div className={styles.item2}>
          <Switch color='success' onChange={setTheme}/>
        </div>
      </div>
    </div>
  );
}
