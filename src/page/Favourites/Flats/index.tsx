"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import styles from "../../../components/Flat/styles.module.scss";
import houseApi from "@/service/houseApi.service";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useRemoveFavoriteHouseMutation } from "@/service/favorite.service";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface House {
  id: number;
  address: string;
  cost: number;
  cost_utilities: number;
  count_neighbors: number;
  is_have_bail: boolean;
  floor: number;
  building_floor: number;
  i_am_owner: boolean;
  is_possible_animals: boolean;
  is_possible_smoke: boolean;
  photos_ids: string[];
  creator_id: string;
}

const FavoritesPage: React.FC = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const [removeHouseFromFavorite] = useRemoveFavoriteHouseMutation();

  const [favoriteHouses, setFavoriteHouses] = useState<House[]>([]);
  const [usersList, setUsersList] = useState<{ [key: string]: any }>({});

  const onRemoveFlatFromFavotite = async (house_id: any) => {
    let response = await removeHouseFromFavorite(house_id);
    if (response === null) {
      toast.success("Удалено из избранного");
    } else {
      toast.error("Error!");
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const houses: House[] = await houseApi.listHouses();
      const favorites = houses.filter((house: any) => house.is_favorite);
      setFavoriteHouses(favorites);
    };

    fetchFavorites();
  }, []);

  const isOnFavoritesUsersPage = pathname === "/favourites/posts";
  const isOnFavoritesPage = pathname === "/favourites";

  return (
    <div className={styles.favoritePage}>
      <h1 className={styles.header}>Избранное</h1>
      <nav className={styles.nav_fav}>
        <Link href="/favourites">
          <h2
            className={
              isOnFavoritesPage ? styles.activeLink : styles.inActiveLink
            }
          >
            Избранные квартиры
          </h2>
        </Link>
        <Link href="/favourites/posts">
          <h2
            className={
              isOnFavoritesUsersPage ? styles.activeLink : styles.inActiveLink
            }
          >
            Избранные статьи
          </h2>
        </Link>
      </nav>
      {favoriteHouses.length > 0 ? (
        <div className={styles.favourites}>
          {favoriteHouses.map((flat) => (
            <>
              <Link href={`/flats/${flat.id}`}>
                <div key={flat.id} className={styles.flat}>
                  <div className={styles.banner}>
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      navigation
                    >
                      {flat.photos_ids?.map((photo, index) => (
                        <SwiperSlide className={styles.slide} key={index}>
                          <div className={styles.img}>
                            <img src={photo} alt="Flat Image" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Информация о пользователе */}
                  <div className={styles.containerUser}>
                    <div className={styles.userCard}>
                      <div className={styles.avatar}>
                        <img
                          src={
                            usersList[flat.creator_id]?.avatar
                              ? usersList[flat.creator_id].avatar
                              : "/icons/userProfile.svg"
                          }
                          alt="avatar"
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div className={styles.userInformation}>
                        <h1>
                          {usersList[flat.creator_id]?.first_name ||
                            "Пользователь"}
                        </h1>
                        <h4>
                          {usersList[flat.creator_id]?.my_town ||
                            "Не указан город"}
                        </h4>
                      </div>
                    </div>
                    <h3>{flat.cost}%</h3>
                  </div>

                  {/* Цена квартиры */}
                  <h3 className={styles.price}>{flat.cost} руб/мес</h3>

                  {/* Коммунальные услуги */}
                  <span className={styles.commun}>
                    Коммуналка: {flat.cost_utilities} руб/мес
                  </span>

                  {/* Дополнительная информация о квартире */}
                  <div className={styles.flatInfo}>
                    <div className={styles.blocks}>
                      <ul>
                        <li>
                          {flat.count_neighbors === 1
                            ? "Общая комната"
                            : "Изолированная комната"}
                        </li>
                        <li>
                          {flat.is_have_bail ? "Есть залог" : "Без залога"}
                        </li>
                        <li>
                          {flat.floor}/{flat.building_floor} этаж
                        </li>
                        <li>
                          {flat.i_am_owner
                            ? "Я собственник"
                            : "Снимаю эту квартиру"}
                        </li>
                        <li>
                          {flat.is_possible_animals
                            ? "Можно с животными"
                            : "Без животных"}
                        </li>
                        <li>
                          {flat.is_possible_smoke
                            ? "Можно курить"
                            : "Не курить"}
                        </li>
                      </ul>
                    </div>
                    <div className={styles.bottomBlocks}>
                      <div>
                        <ul>
                          <li>Адрес:</li>
                          <li>{flat.address}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Карта */}
                  <YMaps
                    query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}
                  >
                    <Map
                      style={{ display: "none" }}
                      defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                      modules={["geocode"]}
                    >
                      <Placemark defaultGeometry={[55.75, 37.57]} />
                    </Map>
                  </YMaps>

                  {/* Кнопки для взаимодействия */}
                  <div className={styles.userButtons}>
                    <div>
                      <Link href={`/profile/${flat.creator_id}`}>
                        <button>Написать</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
              <div className={styles.remove_btn}>
                <button
                  onClick={() => onRemoveFlatFromFavotite(Number(flat.id + 1))}
                >
                  Удалить из избранного
                </button>
                <ToastContainer />
              </div>
            </>
          ))}
        </div>
      ) : (
        <p>Избранное пустое</p>
      )}
    </div>
  );
};

export default FavoritesPage;
