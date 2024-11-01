"use client";

import styles from "@/components/Navigation/styles.module.scss";
import {
  noNavbarsPages,
  navigationIcons,
  navigationTitles,
  navInputPages,
  users,
  flats,
  articles,
} from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { usePathname, useRouter, useParams } from "next/navigation";
import NordwibeLogo from "../../../public/svgs/nordwibe";
import Link from "next/link";
import Image from "next/image";
import DesktopNav from "../DesktopNav";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import NavigationMenu from "../NavigationMenu";
import {
  TMenu,
  setChatsSearch,
  setFlatsSearch,
  setMenu,
  setUsersSearch,
} from "@/store/slices/navigation";
import ProfileMenu from "../ProfileMenu";
import { share } from "@/service/share.service";
import { addToFavourites } from "@/store/slices/user";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createIUserFromRealUser, IUser } from "@/interfaces/user.interface";
import { usrApi } from "@/service/userApi.service";
import React from "react";

const profileRegex = /^\/profile\/.+/;
const articlesRegex = /^\/articles\/.+/;
const flatsRegex = /^\/flats\/.+/;
const chatRegex = /^\/chat\/.+/;

interface IFilter {
  filter?: boolean;
  setFilter?: Dispatch<SetStateAction<boolean>>;
}
const Navigation: FC<IFilter> = ({ filter, setFilter }) => {
  const asd = useTypedSelector((selector) => selector.authSlice.token);
  const asd1 = useTypedSelector((selector) => selector.authSlice.user);

  const pathname = usePathname();
  const city = useTypedSelector((selector) => selector.userSlice.user.city);
  const router = useRouter();
  const firstIcon = navigationIcons.firstIcon.find((iconObject) =>
    iconObject.pages.includes(pathname)
  );
  const secondIcon = navigationIcons.secondIcon.find((iconObject) =>
    iconObject.pages.includes(pathname)
  );
  const navigationTitle = navigationTitles.find((title) =>
    title[0].includes(pathname)
  );
  const params = useParams();
  const user = useTypedSelector((selector) => selector.userSlice.user);
  const chatQuery = pathname.split("/")[pathname.split("/").length - 1];
  const chatTitle =
    chatQuery === "support"
      ? "Поддержка"
      : users.find((u) => u.id === Number(chatQuery))
      ? users.find((u) => u.id === Number(chatQuery))!.name
      : "Не найдено";
  const dispatch = useDispatch<AppDispatch>();
  const menu = useTypedSelector((selector) => selector.navigationSlice.menu);

  const { data: usr } = usrApi.useGetUserQuery(Number(params.id as string));
  const idUser = createIUserFromRealUser(usr);
  // const idUser = users.find((u) => u.id === Number(params.id as string))!;
  // const idUser
  const flat = flats.find((a) => a.id === Number(params.id as string))!;
  const article = articles.find((a) => a.id === Number(params.id as string))!;
  const calcNewMessages = useRef<number>(0);
  const [resCount, setResCount] = useState(0);
  let messages: IUser | null = null;
  messages = useTypedSelector((selector) => selector.userSlice.user);
  useEffect(() => {
    calcNewMessages.current = 0;
    messages.notifications.map((n) => {
      if (n[0] == 1) {
        calcNewMessages.current += 1;
      }
    });

    setResCount(calcNewMessages.current);
  }, [messages.notifications]);

  return (
    <>
      {/* <div>token:{asd}</div>
      <div>user:{JSON.stringify(asd1)}</div> */}
      {menu &&
        (profileRegex.test(pathname) ? <ProfileMenu /> : <NavigationMenu />)}
      {noNavbarsPages.some((path) => pathname.includes(path)) ? (
        <>
          <nav className={styles.navigationLogo}>
            <div>
              <Image
                onClick={() => {
                  router.back();
                }}
                src={`/icons/back.svg`}
                alt={"back"}
                width={100}
                height={100}
              />
            </div>
            <NordwibeLogo />
            <div></div>
          </nav>
        </>
      ) : (
        <>
          <div className={styles.desktopNav}>
            <DesktopNav filter={filter} setFilter={setFilter} />
          </div>

          <nav className={styles.navigation}>
            <div className={styles.iconsContainer}>
              {profileRegex.test(pathname) ||
              articlesRegex.test(pathname) ||
              flatsRegex.test(pathname) ||
              chatRegex.test(pathname) ? (
                <Image
                  onClick={() => {
                    router.back();
                  }}
                  src={`/icons/back.svg`}
                  alt={"back"}
                  width={100}
                  height={100}
                />
              ) : firstIcon && firstIcon.icons ? (
                firstIcon.icons.map((icon, i) =>
                  icon[1] && icon[1] != "back" ? (
                    <Link
                      key={i}
                      href={icon[1]}
                      className={styles.messages_icon}
                    >
                      <Image
                        src={`/icons/${icon[0]}.svg`}
                        alt={icon[0]}
                        width={100}
                        height={100}
                      />
                      {resCount > 0 && (
                        <>
                          <div className={styles.new_messages_count}>
                            {calcNewMessages.current}
                          </div>
                        </>
                      )}
                    </Link>
                  ) : (
                    <Image
                      key={i}
                      onClick={() => {
                        icon[1] === "back" && router.back();
                      }}
                      src={`/icons/${icon[0]}.svg`}
                      alt={icon[0]}
                      width={100}
                      height={100}
                    />
                  )
                )
              ) : (
                ""
              )}
            </div>

            {navInputPages.includes(pathname) ? (
              <div className={styles.input}>
                <input
                  type="text"
                  onChange={(e) => {
                    if (pathname === "/neighbors")
                      dispatch(setUsersSearch(e.target.value));
                    else if (pathname === "/flats")
                      dispatch(setFlatsSearch(e.target.value));
                    else if (pathname === "/chat")
                      dispatch(setChatsSearch(e.target.value));
                  }}
                />
                <Image
                  src={"/icons/search.svg"}
                  width={100}
                  height={100}
                  alt="search"
                />
              </div>
            ) : (
              <h3>
                {pathname === "/" ? (
                  <Link href={"/cities"}>{`${city.toUpperCase()}>`}</Link>
                ) : navigationTitle ? (
                  navigationTitle[1].toUpperCase()
                ) : (
                  ""
                )}
                {chatRegex.test(pathname) && chatTitle.toUpperCase()}
                {articlesRegex.test(pathname) && "Советы о нас".toUpperCase()}
                {profileRegex.test(pathname) &&
                  (Number(params.id) != user.id
                    ? idUser.name
                    : "Личный кабинет".toUpperCase())}
                {flatsRegex.test(pathname) && "Квартира".toUpperCase()}
              </h3>
            )}

            {/* Тут был Сталин. Это его говнокод, не мой, честно :( */}

            <div className={styles.iconsContainer}>
              {profileRegex.test(pathname) ? (
                Number(params.id) != user.id ? (
                  <>
                    {pathname === `/profile/${params.id}` && (
                      <Image
                        src={"/icons/share.svg"}
                        alt="share"
                        width={100}
                        height={100}
                        onClick={() =>
                          share(
                            "Пользователь",
                            "Страница пользователя",
                            pathname
                          )
                        }
                      />
                    )}
                    <Image
                      src={`/icons/like${
                        user.favourites.users.find((us) => us.id === idUser.id)
                          ? "d"
                          : ""
                      }.svg`}
                      alt="like"
                      width={100}
                      height={100}
                      onClick={() =>
                        dispatch(
                          addToFavourites({ type: "users", value: idUser })
                        )
                      }
                    />
                    <Image
                      src={"/icons/menu.svg"}
                      alt="menu"
                      width={100}
                      height={100}
                      onClick={() => dispatch(setMenu(menu ? null : "profile"))}
                    />
                  </>
                ) : (
                  pathname === `/profile/${params.id}` && (
                    <Image
                      src={"/icons/share.svg"}
                      alt="share"
                      width={100}
                      height={100}
                      onClick={() =>
                        share(user.username, "Страница пользователя", pathname)
                      }
                    />
                  )
                )
              ) : articlesRegex.test(pathname) ? (
                <>
                  <Image
                    src={"/icons/share.svg"}
                    alt="share"
                    width={100}
                    height={100}
                    onClick={() => share("Статья", "Страница статьи", pathname)}
                  />
                  <Image
                    src={`/icons/like${
                      user.favourites.articles.find(
                        (ar) => ar.id === article.id
                      )
                        ? "d"
                        : ""
                    }.svg`}
                    alt="like"
                    width={100}
                    height={100}
                    onClick={() =>
                      dispatch(
                        addToFavourites({ type: "articles", value: article })
                      )
                    }
                  />
                </>
              ) : flatsRegex.test(pathname) ? (
                <>
                  <Image
                    src={"/icons/share.svg"}
                    alt="share"
                    width={100}
                    height={100}
                    onClick={() =>
                      share("Квартира", "Страница квартиры", pathname)
                    }
                  />
                  <Image
                    src={`/icons/like${
                      user.favourites.flats.find((fl) => fl.id === flat.id)
                        ? "d"
                        : ""
                    }.svg`}
                    alt="like"
                    width={100}
                    height={100}
                    onClick={() =>
                      dispatch(addToFavourites({ type: "flats", value: flat }))
                    }
                  />
                  <Image
                    src={"/icons/menu.svg"}
                    alt="menu"
                    width={100}
                    height={100}
                    onClick={() => dispatch(setMenu(menu ? null : "flat"))}
                  />
                </>
              ) : secondIcon && secondIcon.icons ? (
                secondIcon.icons.map((icon, i) =>
                  icon[1] ? (
                    ""
                  ) : (
                    <Image
                      key={i}
                      onClick={() => {
                        if (icon[0] === "menu") {
                          let value: TMenu = null;
                          switch (pathname) {
                            case "/notifications": {
                              value = "notifications";
                              break;
                            }
                            case "/favourites": {
                              value = "favourites";
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
              ) : (
                ""
              )}
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
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default React.memo(Navigation);
