"use client";

import React from "react";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";

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
      {!addRegex.test(pathname) && <footer>Nordwibe 2024</footer>}
    </div>
  );
});
