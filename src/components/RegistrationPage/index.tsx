"use client";

import React from "react";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default React.memo(function RegistrationView({
  children,
}: {
  children: React.ReactNode;
}) {
  const addRegex = /^\/add-apartment\/.+/;
  const pathname = usePathname();
  return (
    <div className={styles.page}>
      <main>{children}</main>
      {!addRegex.test(pathname) && <footer>Продолжая, ты принимаешь  <Link href={""}>Пользовательское соглашение</Link> и <Link href={""}>Политику конфиденциальности</Link></footer>}
    </div>
  );
});
