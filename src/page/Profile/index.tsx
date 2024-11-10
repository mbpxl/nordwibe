"use client";

import Button from "@/components/Button";
import LinkCard from "@/components/LinkCard";
import { LinkCardsProfile, flats, profileUsersCards, users } from "@/config";
import styles from "@/page/Profile/styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, useEffect, useRef } from "react";
import TGLOGO from "../../../public/svgs/tg";
import VKLOGO from "../../../public/svgs/vk";
import PHONELOGO from "../../../public/svgs/phone";
import MAILLOGO from "../../../public/svgs/mail";
import NOTIFICATIONLOGO from "../../../public/svgs/notification";
import READLOGO from "../../../public/svgs/read";
import HELPLOGO from "../../../public/svgs/help";
import EXITLOGO from "../../../public/svgs/exit";
import { useTypedSelector } from "@/hooks/selector.hook";
import Diagram from "@/components/Diagram";
import UserIdentityCard from "@/components/UserIdentiryCard";
import Flat from "@/components/Flat";
import { useState } from "react";
import {
  createIUserFromRealUserMe,
  IRealUser,
  IRealUserMe,
  IUser,
  createIUserFromRealUser,
} from "@/interfaces/user.interface";
import Neighbor from "@/components/Neighbor";
import userApi, { usrApi } from "@/service/userApi.service";
import { hApi } from "@/service/houseApi.service";
import React from "react";
import { ToastContainer } from "react-toastify";

const Profile: FC<{ id: string }> = ({ id }) => {
  // const user = users.find((user) => user.id === Number(id));
  // const yourUser = useTypedSelector((selector) => selector.userSlice.user);
  const { data: yourUser } = usrApi.useGetMeQuery();
  const { data: user } = usrApi.useGetUserQuery(Number(id));
  const { data: flats } = hApi.useListHouseQuery();

  // console.log(yourUser)
  // console.log(user)
  const hide = (id: number) => {
    setNeighbors(neighbors.filter((user) => user.id != id));
  };
  const [neighbors, setNeighbors] = useState<Array<IUser>>(users);
  const calcNewMessages = useRef<number>(0);
  const [resCount, setResCount] = useState(0);
  let messages: IUser | null = null;
  messages = useTypedSelector((selector) => selector.userSlice.user);

  // const [user,setUser] = useState<IRealUserMe>()

  // useEffect(()=>{
  //   (async ()=>{
  //     const fetched = await userApi.getMe();
  //     setUser(fetched)
  //     console.log(user)
  //   })()
  // },[])

  // const [user, setUser] = useState<IRealUserMe>({
  //   id: 0,
  //   first_name: "Витя",
  //   date_joined: "2024-09-11T21:44:39.177Z",
  //   count_visits: 0,
  //   avatar: "",
  //   purpose: "JB",
  //   occupation: "UK",
  //   smoking: "U",
  //   pets: "U",
  //   first_aid: "U",
  //   social_interaction: "U",
  //   home_town: "Питер",
  //   my_town: "Москва",
  //   is_favorite: true,
  //   username: "vitalik",
  //   email: "hooll@gmail.com",
  //   date_birthday: "2004-09-11T21:44:39.177Z",
  //   gender: "UK",
  //   type_auth: "NM",
  //   is_staff: true,
  //   is_active: true,
  //   last_login: "2024-09-11T21:44:39.177Z",
  //   is_superuser: true,
  // });
  const age =
    user && yourUser && user.id === yourUser.id && yourUser.date_birthday
      ? new Date().getFullYear() -
        new Date(yourUser.date_birthday).getFullYear()
      : 0;

  // if (!user) return notFound();
  // if(user)
  // {useEffect(() => {
  //   calcNewMessages.current = 0;
  //   // messages.notifications.map((n) => {
  //   //   if (n[0] == 1) {
  //   //     calcNewMessages.current += 1;
  //   //   }
  //   // });
  //   // fetch("https://3133319-bo35045.twc1.net/api/v0/users/", {
  //   //   method: "GET",
  //   //   credentials: "include",
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((res: IRealUserMe) => console.log(res))
  //   //   .catch((error) => console.log(error));
  //   if (user.social_interaction) {
  //   }
  //   setResCount(calcNewMessages.current);
  // }, []);}

  return (
    <>
      {user && yourUser && (
        <div className={styles.profile}>
          <div className={styles.general}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                {/* заглушка - на половину ширину. фотка юзера на весь размер, со скруглением */}
                <Image
                  src={
                    user && user.avatar ? user.avatar : "/icons/userProfile.svg"
                  }
                  alt="avatar"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.userInformation}>
                <h1>
                  {user && user.first_name}
                  {age ? ", " + age : ", 0"}
                </h1>
                <h4>из г. {user && user.home_town}</h4>
                {/* UNCOMMENT */}
                {/* <h4>@{user.username}</h4> */}
              </div>
            </div>

            <ul className={styles.parameters}>
              {/* {user.parameters.map((parameter, i) => (
            <li key={i}>
             
              <p>{parameter.value}</p>
            </li>
          ))} */}
              <li>
                <Image
                  src={`/icons/purpose.svg`}
                  alt="purpose"
                  width={100}
                  height={100}
                />
                <p>{user.purpose}</p>
              </li>
              <li>
                <Image
                  src={`/icons/pencil.svg`}
                  alt="status"
                  width={100}
                  height={100}
                />
                <p>
                  {user.occupation?.toLowerCase() == "без работы"
                    ? "Путешествую"
                    : user.occupation}
                </p>
              </li>
            </ul>
            {user.id === yourUser.id && (
              <Button>
                <Link href={`/profile/${user.id}/parameters`}>
                  Редактировать профиль
                </Link>
              </Button>
            )}
            {user.id !== yourUser.id && (
              <div className={styles.buttons}>
                <Link href={`/chat/${id}`}>
                  <button>Написать</button>
                </Link>
                {/* <button onClick={() => hide(id)}>Скрыть</button> 
                fixme*/}
                <button>Скрыть</button>
              </div>
            )}
          </div>

          <div className={styles.cards}>
            {/* {LinkCardsProfile.map((card, i) => ( */}
            {/* // <Link key={i} href={`/profile/${id}` + card[2]}> */}
            <LinkCard
              image={LinkCardsProfile[0][0]}
              text={LinkCardsProfile[0][1]}
              text_two={
                user.pets.toLowerCase() == "да"
                  ? "Есть питомцы"
                  : "Без питомцев"
              }
            />
            <LinkCard
              image={LinkCardsProfile[1][0]}
              text={LinkCardsProfile[1][1]}
              text_two={
                user.first_aid?.toLowerCase() == "да"
                  ? "Повышенная чувствительность"
                  : "Не чувствителен к аллергенам"
              }
            />
            <LinkCard
              image={LinkCardsProfile[2][0]}
              text={LinkCardsProfile[2][1]}
              text_two={
                user.occupation?.toLowerCase() == "без работы" ||
                user.occupation?.toLowerCase() == "неизвестно"
                  ? "Путешествую"
                  : user.occupation
              }
            />
            <LinkCard
              image={LinkCardsProfile[3][0]}
              text={LinkCardsProfile[3][1]}
              text_two={
                user.social_interaction?.toLowerCase() == "да"
                  ? "Устраиваю перекуры"
                  : user.social_interaction?.toLowerCase() == "иногда"
                  ? "Парю"
                  : "Не курю"
              }
            />

            {/* // </Link> */}
            {/* // ))} */}
          </div>

          <div className={styles.compatibility}>
            <div className={styles.diagram}>
              <Diagram />
            </div>

            <h4>
              {user.id === yourUser.id
                ? "пользователей приложения могут стать твоими друзьями"
                : "Совместимость с тобой"}
            </h4>
          </div>

          <div className={styles.profileLinksList}>
            <h4>Контакты</h4>
            <ul>
              <li>
                <TGLOGO />
                {/* <a
              href={`https://t.me/${user.contact.telegram.split("@")[1]}`}
              target="_blank"
            > */}{" "}
                <p>user_telegram</p>
                {/* </a> */}
              </li>
              <li>
                <VKLOGO />
                {/* <a
              href={`https://vk.com/${user.contact.telegram.split("@")[1]}`}
              target="_blank"
            > */}{" "}
                <p>user_vk</p>
                {/* </a> */}
              </li>
              <li>
                <PHONELOGO />
                {/* <a href={`tel:${user.}`} target="_blank">
            
            </a> */}
                <p>user_number</p>
              </li>
              {/* <li>
            <MAILLOGO />
            <a href={`mailto:${user.email}`} target="_blank">
              {" "}
              <p>{user.email}</p>
            </a>
          </li> */}
            </ul>

            {user.id === yourUser.id && (
              <Button>
                <Link href={`/profile/${user.id}/parameters`}>
                  Изменить контакты
                </Link>
              </Button>
            )}
          </div>
          {/* Если квартиры чела есть*/}
          {true && (
            <div className={styles.flats}>
              <h4>Предложения жилья:</h4>
              {/* Тут тащим квартиры юзера или чела чей айдишник */}
              {flats && flats.map((f) => <><Flat flat={f} key={f.id} />
              <ToastContainer/>
              </> )}
              {/* <Flat flat={flats[1]} /> */}
            </div>
          )}

          {/* Если у п в лк нет квартир и это лк*/}
          {user.id === yourUser.id && false && (
            <div className={styles.flats}>
              <p>
                Тут должны быть предложения жилья, но ты пока ничего не добавил
              </p>
              <button className={styles.button}>
                <Link href="/add-apartment/1">Позвать к себе соседей</Link>
              </button>
            </div>
          )}

          {user.id === yourUser.id && (
            <div className={styles.profileLinksList}>
              <h4>А еще:</h4>
              <ul>
                <li>
                  <div className={styles.messages_icon}>
                    {resCount > 0 && (
                      <>
                        <div className={styles.new_messages_count}>
                          {calcNewMessages.current}
                        </div>
                      </>
                    )}
                    <NOTIFICATIONLOGO />
                  </div>
                  <Link href={"/notifications"}>
                    <p>Уведомления</p>
                  </Link>
                </li>

                <li>
                  <HELPLOGO />
                  <Link href={"/chat/support"}>
                    <p>Поддержка</p>
                  </Link>
                </li>
                <li>
                  <EXITLOGO />
                  <p>Выход</p>
                </li>
              </ul>
            </div>
          )}

          {/* {user.id != yourUser.id && (
        <div className={styles.usersCols}>
          <h4>Похожие пользователи</h4>
          {neighbors.map((user) => (
            <Neighbor user={user} hide={hide} />
          ))}
        </div>
      )} */}
        </div>
      )}
    </>
  );
};

export default React.memo(Profile);
