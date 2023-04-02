import Image from "next/image";
import styles from "./page.module.css";

import { font } from "@/components/font";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2 className={font.className}>Hello world</h2>
    </main>
  );
}
