"use client";

import React, { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { navigationIcons, noNavbarsPages } from "@/config";
import { usePathname } from "next/navigation";
import NordwibeLogo from "../../../public/svgs/nordwibe";
import { useTypedSelector } from "@/hooks/selector.hook";
import Image from "next/image";
import { setMenu, TMenu } from "@/store/slices/navigation";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

interface IFilter {
  filter?: boolean;
  setFilter?: Dispatch<SetStateAction<boolean>>;
}

const DesktopNav: FC<IFilter> = ({ filter, setFilter }) => {
  const pathname = usePathname();
  const city = useTypedSelector((selector) => selector.userSlice.user.city);
  const menu = useTypedSelector((selector) => selector.navigationSlice.menu);
  const u = useTypedSelector((selector) => selector.authSlice.user);
  //TODO resolve
  // @ts-ignore
  const profileId = u ? u.id : 1;
  const dispatch = useDispatch<AppDispatch>();
  const secondIcon = navigationIcons.secondIcon.find((iconObject) =>
    iconObject.pages.includes(pathname)
  );

  return (
    <nav className={styles.nav}>
      {noNavbarsPages.some((path) => pathname.includes(path)) ? (
        <div className={styles.logo}>
          <NordwibeLogo />
        </div>
      ) : (
        <ul>
          <li>
            <Link href={"/"}>Главная</Link>
          </li>
          <li>
            <Link href={`/profile/${profileId}`}>Личный кабинет</Link>
          </li>
          <li>
            <Link className={styles.big} href={"/cities"}>
              {`${city.toUpperCase()}>`}
            </Link>
          </li>
          <li>
            <Link href={"/favourites"}>Избранное</Link>
          </li>
          <li>
            <Link href={"/chat"}>Соообщения</Link>
          </li>
        </ul>
      )}
      {secondIcon && secondIcon.icons
        ? secondIcon.icons.map(
            (icon, i) =>
              pathname == "/notifications" && (
                <Image
                  className={styles.navigation_filter}
                  key={i}
                  onClick={() => {
                    if (icon[0] === "menu") {
                      let value: TMenu = null;
                      switch (pathname) {
                        case "/notifications": {
                          value = "notifications";
                          break;
                        }
                      }
                      dispatch(setMenu(menu ? null : value));
                    }
                  }}
                  src={`/icons/${icon[0]}.svg`}
                  alt={icon[0]!}
                  width={100}
                  height={100}
                />
              )
          )
        : ""}
      {pathname == "/flats" && (
        <div className={styles.filter_logo}>
          <svg
            onClick={() => (setFilter ? setFilter(!filter) : 0)}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6862 0H1.31403C0.148197 0 -0.440076 1.41455 0.385979 2.2406L10.5 12.3561V23.625C10.5 24.0533 10.709 24.4546 11.0598 24.7003L15.4348 27.7617C16.298 28.3659 17.5 27.7535 17.5 26.6864V12.3561L27.6143 2.2406C28.4386 1.41619 27.8544 0 26.6862 0Z"
              fill="#5755C4"
            />
          </svg>
        </div>
      )}
    </nav>
  );
};

export default React.memo(DesktopNav);
