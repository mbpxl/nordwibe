"use client";

import Button from "@/components/Button";
import goto from "../../../public/icons/goto.svg"
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
import userApi, { useGetUserQuery, usrApi } from "@/service/userApi.service";
import { hApi } from "@/service/houseApi.service";
import React from "react";
import { ToastContainer } from "react-toastify";
import { abbreviations } from "@/utils/transform";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Profile: FC<{ id: string }> = ({ id }) => {
  let isSurveyCompleted = useSelector((state: RootState) => state.userSlice.isSurveyCompleted);
  const profile = useGetUserQuery(Number(id));

  console.log(profile);
  const [isEditingMode, setEditinigMode] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("Описание профиля");
  const { data: yourUser } = usrApi.useGetMeQuery();
  const { data: user } = usrApi.useGetUserQuery(Number(id));
  const { data: flats } = hApi.useListHouseQuery();

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget?.value);
  }

  const hide = (id: number) => {
    setNeighbors(neighbors.filter((user) => user.id != id));
  };
  const [neighbors, setNeighbors] = useState<Array<IUser>>(users);
  const calcNewMessages = useRef<number>(0);
  const [resCount, setResCount] = useState(0);
  let messages: IUser | null = null;
  messages = useTypedSelector((selector) => selector.userSlice.user);

  const age =
    user && yourUser && user.id === yourUser.id && yourUser.date_birthday
      ? new Date().getFullYear() -
        new Date(yourUser.date_birthday).getFullYear()
      : 0;

  return (
    <>
      {user && yourUser && (
        <div className={styles.profile}>
          <div className={styles.general}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                <Image
                  src={"/icons/userProfile.svg"}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.userInformation}>
                <h1>
                  {user && user.first_name}
                  {age ? ", " + age : ""}
                </h1>
                <h4>из г. {user && user.home_town}</h4>
                <div className={styles.description}>
                  {isEditingMode ? (
                    <textarea
                      
                      cols={40}
                      rows={20}
                      placeholder="Описание..."
                      value={description}
                      onChange={handleChangeDescription}
                      onBlur={() => {setEditinigMode(!isEditingMode)}}
                    />
                  ) : (<h6>{description}</h6>)}
                  {user.id === yourUser.id ? (
                    <button onClick={() => {setEditinigMode(!isEditingMode)}}>
                      {isEditingMode ? ("") : (
                        <Image
                        src={`/icons/pencil.svg`}
                        alt="status"
                        width={20}
                        height={20}
                      />
                      )}
                  </button>
                  ) : ("")}
                </div>
              </div>
            </div>

            <ul className={styles.parameters}>
              <li>
                <Image
                  src={`/icons/purpose.svg`}
                  alt="purpose"
                  width={100}
                  height={100}
                />
                <p>{abbreviations.purpose[user.purpose]}</p>
              </li>
              <li>
                <Image 
                  src={goto} //!asdasdsad
                  alt="purpose"
                  width={100}
                  height={100}
                />
                <p>Хочу поехать в {user.my_town}</p>
              </li>
              <li>
                <Image
                  src={`/icons/pencil.svg`}
                  alt="status"
                  width={100}
                  height={100}
                />
                <p>
                  {abbreviations.occupation[user.occupation]
                    ? abbreviations.occupation[user.occupation]
                    : "Род деятельности не указан"}
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
                <button>Скрыть</button>
              </div>
            )}
          </div>

          <div className={styles.cards}>
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
          </div>

          <div className={styles.compatibility}>
            <div className={styles.diagram}>
              <Diagram isSurveyCompleted={isSurveyCompleted}/>
            </div>

            <h4>
              {user.id === yourUser.id
                ? "пользователей приложения могут стать твоими друзьями"
                : isSurveyCompleted ? ("Совместимость с тобой") : ("Для отображения процента совместимости необходимо заполнить анкету!")}
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
              {flats &&
                flats.map((f) => (
                  <>
                    <Flat flat={f} key={f.id} />
                    <ToastContainer />
                  </>
                ))}
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
                    {/* <NOTIFICATIONLOGO /> */}
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
        </div>
      )}
    </>
  );
};

export default React.memo(Profile);
