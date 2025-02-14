"use client";

import styles from "@/components/Flat/styles.module.scss";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IRealFlat } from "@/interfaces/flat.interface";
import { AppDispatch } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { usersList } from "@/config";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import { useAddHouseToFavoriteMutation } from "@/service/favorite.service";
import { useGetUserQuery } from "@/service/userApi.service";
const Flat: FC<{ flat: IRealFlat }> = ({ flat }) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const user = useTypedSelector((selector) => selector.userSlice.user);
  const mapRef = useRef();
  const [district, setDistrict] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>({});

  const [addHouseToFavourite] = useAddHouseToFavoriteMutation();

  //* Получаем данные о конкретном пользователи (в свойстве flat из пропсов содержится информация о создателе хаты), чтобы узнать его имя и ещё данные
  const {
    data: fetchedCurrentUser,
    error,
    isLoading,
  } = useGetUserQuery(flat.creator_id);

  useEffect(() => {
    if (fetchedCurrentUser) {
      setCurrentUser(fetchedCurrentUser);
    }
  }, [fetchedCurrentUser]);

  const geocode = (ymaps: any) => {
    ymaps.geocode(flat.address).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);

      ymaps
        .geocode(firstGeoObject.geometry._coordinates, {
          kind: "district",
          results: 1,
        })
        .then((res: any) => {
          let firstGeoObject = res.geoObjects.get(0);
          setDistrict(firstGeoObject.getAddressLine());
        });
    });
  };

  const addFlatToFavourite = async (house_id: any) => {
    try {
      let response = await addHouseToFavourite(house_id);
      if ("data" in response) {
        toast.success("Добавлено в избранное!");
      }
    } catch (error) {
      toast.error("Ошибка. Попробуйте позднее.");
    }
  };

  return (
    <>
      <Link href={`/flats/${flat.id}`}>
        <div className={styles.flat}>
          <div className={styles.banner}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              slidesPerGroup={1}
              centeredSlides={true}
              centeredSlidesBounds={true}
              pagination={{ clickable: true }}
              navigation
            >
              {flat.photos_ids &&
                flat.photos_ids.map((photo, index) => {
                  return (
                    <SwiperSlide className={styles.slide} key={index}>
                      <div className={styles.img}>
                        <img src={photo} alt="banner" />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          <div className={styles.containerUser}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                <img
                  src={
                    usersList[flat.creator_id] &&
                    usersList[flat.creator_id].avatar
                      ? usersList[flat.creator_id].avatar
                      : "/icons/userProfile.svg"
                  }
                  alt="avatar"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div className={styles.userInformation}>
                <h1>{currentUser.first_name}</h1>
                <h4>{currentUser.my_town}</h4>
              </div>
            </div>
            <h1 className="ml-5">XX%</h1>
          </div>
          <h3 className={styles.price}>{flat.cost}руб/мес</h3>
          <span className={styles.commun}>
            Комуналка:{flat.cost_utilities}руб/мес
          </span>

          <div className={styles.flatInfo}>
            <div className={styles.blocks}>
              <ul>
                <li>
                  {flat.count_neighbors === 1
                    ? "Общая комната"
                    : "Изолированная комната"}
                </li>
                <li>{flat.is_have_bail ? "Есть залог" : "Без залога"}</li>
                <li>
                  {flat.floor}/{flat.building_floor} этаж
                </li>
                <li>
                  {flat.i_am_owner ? "Я собственник" : "Снимаю эту квартиру"}
                </li>
                <li>
                  {flat.is_possible_animals
                    ? "Можно с животными"
                    : "Без животных"}
                </li>
                <li>{flat.is_possible_smoke ? "Можно курить" : "Не курить"}</li>
              </ul>
            </div>
            <div className={styles.bottomBlocks}>
              <div>
                <ul>
                  <li>Адрес:</li>
                  <li>
                    Район: {district.split(",")[district.split(",").length - 1]}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
            <Map
              onLoad={(ymaps) => geocode(ymaps)}
              style={{ display: "none" }}
              instanceRef={mapRef}
              defaultState={{
                center: [55.75, 37.57],
                zoom: 9,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              modules={[
                "control.ZoomControl",
                "control.FullscreenControl",
                "multiRouter.MultiRoute",
                "geocode",
              ]}
            >
              <Placemark defaultGeometry={[55.75, 37.57]} />
            </Map>
          </YMaps>
          <div className={styles.userButtons}>
            <div>
              <Link href={`/profile/${flat.creator_id + 1}`}>
                <button>Написать</button>
              </Link>
            </div>
          </div>
        </div>
      </Link>

      <div className={styles.favourites}>
        <button onClick={() => addFlatToFavourite(Number(flat.id + 1))}>
          Добавить в избранное
        </button>
      </div>
    </>
  );
};

export default React.memo(Flat);
