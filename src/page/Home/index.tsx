/* eslint-disable @next/next/no-img-element */
"use client";

import Article from "@/components/Article";
import LinkCard from "@/components/LinkCard";
import { LinkCards } from "@/config";
import styles from "@/page/Home/styles.module.scss";
import Link from "next/link";
import NOTIFICATIONLOGO from "../../../public/svgs/notification";
import { memo, useEffect, useRef, useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { useTypedSelector } from "@/hooks/selector.hook";
import Stories from "react-insta-stories";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { BASE_DOMAIN, useGetStoriesQuery } from "@/service/stories.service";
import houseApi from "@/service/houseApi.service";
import { setToken } from "@/store/slices/auth";
import { useGetPostsQuery } from "@/service/articles.service";

export const Home = () => {
  //* получаем состояние авторизованности пользователя (true/false)
  const isAuth = useSelector((state: RootState) => state.authSlice.isAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [openStories, setOpenStories] = useState(false);
  const calcNewMessages = useRef<number>(0);
  const [resCount, setResCount] = useState(0);
  let messages: IUser | null = null;
  const swipeStart = useRef(0);
  messages = useTypedSelector((selector) => selector.userSlice.user);

  //@ts-ignore
  const { data: articles, isLoadingPosts, errorPosts } = useGetPostsQuery();

  //@ts-ignore
  const { data: stories, error, isLoading } = useGetStoriesQuery(); //* Получаем сторисы. Метод который отправляет запрос.

  //* useState для хранения __АЙДИ__ сторисов
  const [storiesIds, setStoriesIds] = useState<string[]>([]);

  //* Используем полученные айди выше для отправки за __НАЗВАНИЯМИ СТОРИСОВ__
  useEffect(() => {
    if (stories && !error && !isLoading) {
      const allImagesIds: string[] =
        stories.length > 0 ? stories[0].images_Ids : [];

      if (allImagesIds.length > 0) {
        houseApi
          .getImages(allImagesIds)
          .then((fetchedImgs) => {
            setStoriesIds(fetchedImgs);
          })
          .catch((error) => console.log("Failed to fetch images: ", error));
      }
    }
  }, [error, isLoading, stories]);

  console.log(storiesIds);

  const storyList = storiesIds.map((story) => BASE_DOMAIN + story);

  const CloseStoriesWithSwipe = (end: number) => {
    if (end + 150 < swipeStart.current) {
      setOpenStories(false);
    }
  };
  const ChangeSwipeStart = (start: number) => {
    swipeStart.current = start;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    } else if (!isAuth) {
      router.push("/sign-in");
    }
  }, [isAuth, router, dispatch]);

  useEffect(() => {
    calcNewMessages.current = 0;
    messages?.notifications.map((n) => {
      if (n[0] == 1) {
        calcNewMessages.current += 1;
      }
    });

    setResCount(calcNewMessages.current);
  }, [messages?.notifications]);

  if (isLoadingPosts) {
    return <div>Загрузка...</div>;
  }

  if (errorPosts) {
    return <div>Ошибка при загрузке статей</div>;
  }

  return (
    <div className={`${styles.home}`}>
      {window.innerWidth > 900 && (
        <a href="/notifications" className={styles.messages_icon}>
          <NOTIFICATIONLOGO />
          {resCount > 0 && (
            <>
              <div className={styles.new_messages_count}>{}</div>
            </>
          )}
        </a>
      )}
      <div className={`${styles.stories}`}>
        {storyList.map((story, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => {
              setOpenStories(true);
            }}
          >
            <img src={story} alt="story" />
          </div>
        ))}
      </div>
      {openStories && (
        <>
          <div
            className={styles.stories_module}
            onTouchStart={(e) => ChangeSwipeStart(e.touches[0].clientY)}
            onTouchEnd={(e) => {
              CloseStoriesWithSwipe(e.changedTouches[0].clientY);
            }}
          >
            <Stories
              loop
              keyboardNavigation
              defaultInterval={2000}
              stories={storyList}
              width={320}
              height={"90%"}
              onAllStoriesEnd={() => setOpenStories(false)}
              storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
            />
            <div className={styles.exit}>
              <svg
                onClick={() => setOpenStories(false)}
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="1"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="#fff"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>
        </>
      )}
      <div className={styles.cards}>
        {LinkCards.map((card, i) => (
          <Link key={i} href={card[2]}>
            <LinkCard image={card[0]} text={card[1]} />
          </Link>
        ))}
      </div>
      <div className={`${styles.beta}`}>
        <b>Привет👋</b>
        <br />
        Это бета-версия приложения
        <br />
        <p>&nbsp;</p>
        Мы стараемся сделать все так, чтобы тебе понравилось
        <br />
        <p>&nbsp;</p>
        Пожалуйста, напиши нам в <a href="/chat/support">чате</a> или в{" "}
        <a href="https://t.me/nordwibe_media" target="_blank">
          телеграм
        </a>
        , что нам поправить или добавить🥺
        <br />
      </div>
      <h1>Журнал</h1>
      <div className={styles.articles}>
        {articles && articles.length > 0 ? (
          articles.map((article: any) => (
            <div key={article.id} className={styles.artic}>
              <Article {...article} />
            </div>
          ))
        ) : (
          <div>Нет доступных статей</div>
        )}
      </div>
    </div>
  );
};

export default memo(Home);
