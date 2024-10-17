"use client";

import { usePathname } from "next/navigation";
import MobileBottomMenu from "../MobileBottomMenu";
import Navigation from "../Navigation";
import { Providers } from "../Providers";
import styles from "./styles.module.scss";
import { noNavbarsPages, profileCircleProgress } from "@/config";
import { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/selector.hook";
import Filter from "@/components/Filter";
const chatRegex = /^\/chat\/.+/;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [filter, setFilter] = useState(false);
  
  useEffect(() => {
    document
      .querySelector("html")!
      .style.setProperty("--progress", profileCircleProgress);
  });

  return (
    <Providers>
      <div className={styles.layout}>
      {filter && <Filter setFilter={setFilter}/>}
    
        <Navigation filter={filter} setFilter={setFilter} />
        <main className={styles.main}>
          {children}
        </main>

        {!noNavbarsPages.some((path) => pathname.includes(path)) &&
        !chatRegex.test(pathname) ? (
          <MobileBottomMenu />
        ) : (
          ""
        )}
      </div>
    </Providers>
  );
};

export default Layout;
