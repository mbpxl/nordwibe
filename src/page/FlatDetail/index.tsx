"use client";

import Convenience from "@/components/Convenience";
import IconCard from "@/components/IconCard";
import styles from "@/page/FlatDetail/styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { notFound, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useTypedSelector } from "@/hooks/selector.hook";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { YMaps, Map, GeoObject } from "@pbe/react-yandex-maps";
import TickLOGO from "../../../public/svgs/tick";
import { IRealFlat } from "@/interfaces/flat.interface";
import { FlatList, users, usersList } from "@/config";
import houseApi from "@/service/houseApi.service";
import React from "react";

const FlatDetail: FC<{ id: string }> = ({ id }) => {
  const pathname = usePathname();
  const [flat, setFlat] = useState<IRealFlat>();
  useEffect(() => {
    (async () => {
      const fetched = await houseApi.getHouse(Number(id));
      setFlat(fetched);
    })();
  }, []);

  // const [flat, setFlat] = useState<IRealFlat>(
  //   FlatList[+pathname.split("/")[pathname.split("/").length - 1] - 1]
  // );

  const [open, setOpen] = useState(false);
  const [addressCoord, setAddressCoord] = useState([55.75, 37.57]);
  const user = useTypedSelector((selector) => selector.userSlice.user);
  const mapRef = useRef();
  const [district, setDistrict] = useState<string>("");
  const geocode = (ymaps: any) => {
    const address = (flat && flat.address) || "";
    ymaps.geocode(address).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setAddressCoord(firstGeoObject.geometry._coordinates);
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

  const copyGeoLink = (longitude: number, latitude: number) => {
    const url = `https://yandex.ru/maps/?ll=${longitude},${latitude}&z=15`;
    navigator.clipboard.writeText(url);
  };

  // useEffect(() => { }, []);

  if (!flat) return notFound();

  return (
    <div className={styles.flat}>
      {open && (
        <>
          <div className={styles.module}>
            <div className={styles.exit}>
              <svg
                onClick={() => setOpen(false)}
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
                    fill="#5755c4"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              slidesPerGroup={1}
              centeredSlides={true}
              centeredSlidesBounds={true}
              pagination={{ clickable: true }}
              navigation
              className={styles.swiper_module}
            >
              {flat.photos_ids.map((el, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    onClick={() => setOpen(true)}
                    className={styles.slide}
                  >
                    <img src={el} alt="banner" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      )}

      <div className={styles.container}>
        <div className={styles.sw_parent}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            slidesPerGroup={1}
            centeredSlides={true}
            centeredSlidesBounds={true}
            pagination={{ clickable: true }}
            className={styles.swiper}
          >
            {flat.photos_ids.map((el, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => setOpen(true)}
                  className={styles.slide}
                >
                  <img src={el} alt="banner" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={styles.containerUser}>
          <div className={styles.userCard}>
            <Link href={`/profile/${flat.creator_id + 1}`}>
              <div className={styles.avatar}>
                <img
                  src={
                    usersList[flat.creator_id].avatar
                      ? usersList[flat.creator_id].avatar
                      : "/icons/userProfile.svg"
                  }
                  alt="avatar"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </Link>
            <div className={styles.userInformation}>
              <Link href={`/profile/`}>
                <h1>{usersList[flat.creator_id].first_name}</h1>
              </Link>
              <h4>{usersList[flat.creator_id].my_town}</h4>
            </div>
          </div>
          <h1>XX%</h1>
        </div>
        <h3 className={styles.price}>{flat.cost}руб/мес</h3>
        <h3 className={styles.commun} onClick={() => setOpen(true)}>
          Комуналка:{flat.cost_utilities}руб/мес
        </h3>
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
                <li>Район: {district}</li>
                {/* <li>Удаленность от</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.userButtons}>
          <div>
            {/* <Link href={`/profile/${flat.user.id}`}> */}
            <button>Написать</button>
            {/* </Link> */}
          </div>
          <div>
            {/* <Link href={pathname}>
              <Image
                src={`/icons/like${
                  user.favourites.flats.find((fl) => fl.id === flat.id)
                    ? "d"
                    : ""
                }.svg`}
                alt="like"
                width={100}
                height={100}
                // onClick={() =>
                //   dispatch(addToFavourites({ type: "flats", value: flat }))
                // }
              />
            </Link> */}
          </div>
        </div>
        <div className={styles.description}>
          <p>{flat.description}</p>
          {flat.accessibility_type && (
            <span>
              {" "}
              <TickLOGO /> повышенная доступность
            </span>
          )}
          {flat.is_have_fines && (
            <span>
              {" "}
              <TickLOGO /> есть лист ответственности
            </span>
          )}
        </div>
        <div className={styles.conveniences}>
          <p className={styles.p}>удобства</p>
          <div className={styles.cards}>
            <div className={styles.conv}>
              {flat.is_have_wifi && <Convenience label="вайфай" />}
            </div>
            <div className={styles.conv}>
              {flat.is_have_conditioner && <Convenience label="кондиционер" />}
            </div>
            <div className={styles.conv}>
              {flat.is_have_balcony && <Convenience label="балкон" />}
            </div>
            <div className={styles.conv}>
              {flat.is_have_security && <Convenience label="консьерж" />}
            </div>
            <div className={styles.conv}>
              {flat.is_have_parking_space && (
                <Convenience label="парковочное место" />
              )}{" "}
            </div>
            <div className={styles.conv}>
              {flat.is_have_horizontal_bars && (
                <Convenience label="спортплощадка" />
              )}{" "}
            </div>
            <div className={styles.conv}>
              {flat.is_have_elevator && <Convenience label="лифт" />}{" "}
            </div>
            <div className={styles.conv}>
              {flat.is_have_garbage_chute && (
                <Convenience label="мусоропровод" />
              )}{" "}
            </div>
            <div className={styles.conv}>
              {flat.is_have_transport_close && (
                <Convenience label="транспорт рядом" />
              )}{" "}
            </div>
          </div>
        </div>
        <div className={styles.all_eq}>
          <p className={styles.p}>Оснащенность квартиры</p>
          <div className={styles.equipments}>
            {flat.is_have_tv && (
              <div className={styles.equipment}>
                <Convenience label="телевизор" />
              </div>
            )}
            {flat.is_have_guest_cabinet && (
              <div className={styles.equipment}>
                <Convenience label="отдельный шкаф" />
              </div>
            )}
            {flat.is_have_hair_dryer && (
              <div className={styles.equipment}>
                <Convenience label="фен" />
              </div>
            )}
            {flat.is_have_guest_table && (
              <div className={styles.equipment}>
                <Convenience label="отдельный стол" />
              </div>
            )}
            {flat.is_have_iron && (
              <div className={styles.equipment}>
                <Convenience label="утюг" />
              </div>
            )}
            {flat.is_have_dishwasher && (
              <div className={styles.equipment}>
                <Convenience label="посудомойка" />
              </div>
            )}
            {flat.is_have_washing_machine && (
              <div className={styles.equipment}>
                <Convenience label="стиральная машина" />
              </div>
            )}
            {flat.is_have_dryer && (
              <div className={styles.equipment}>
                <Convenience label="сушилка" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.location}>
          <h4>Расположение</h4>
          <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
            <Map
              onLoad={(ymaps) => geocode(ymaps)}
              style={{ width: "98%", height: "250px", marginLeft: "1%" }}
              instanceRef={mapRef}
              state={{
                center: addressCoord,
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
              <GeoObject
                geometry={{
                  type: "Point",
                  coordinates: addressCoord,
                }}
              />
            </Map>
          </YMaps>
          <span
            className={styles.copy_location}
            onClick={() => copyGeoLink(addressCoord[1], addressCoord[0])}
          >
            скопировать расположение
          </span>
        </div>
        <div className={styles.about}>
          <h4>О квартире</h4>
          <div className={styles.cards}>
            <IconCard
              label={`Срок : ${
                flat.count_days_to / 30 < 1
                  ? "меньше месяца"
                  : Math.floor(flat.count_days_to / 30)
              } ${
                Math.floor(flat.count_days_to / 30) == 1
                  ? "месяц"
                  : Math.floor(flat.count_days_to / 30) == 2 ||
                    Math.floor(flat.count_days_to / 30) == 3 ||
                    Math.floor(flat.count_days_to / 30) == 4
                  ? "месяца"
                  : "месяцев"
              }`}
              icon="term"
            />
            <IconCard
              label={`Комнаты : ${+flat.count_rooms} ${
                +flat.count_rooms == 1
                  ? "комната"
                  : flat.count_rooms == 2 ||
                    flat.count_rooms == 3 ||
                    flat.count_rooms == 4
                  ? "комнаты"
                  : "комнат"
              }`}
              icon="rooms"
            />
            <IconCard label={`Ремонт : ${flat.repair_type}`} icon="repair" />
            <IconCard label={`Тип дома : ${flat.building_type}`} icon="house" />
            <IconCard
              label={`Шумоизоляция : ${flat.sound_insulation_type}`}
              icon="volume"
            />
            <IconCard
              // солнце попадает
              label={`Солнечная сторона : ${flat.is_sunny_side ? "Да" : "Нет"}`}
              icon="sun"
            />
          </div>
        </div>
        <div className={styles.about}>
          <h4>О районе</h4>
          <div className={styles.cards}>
            <IconCard label="Магазин" icon="shop" time={5} />
            <IconCard label="Остановка" icon="stop" time={5} />
            <IconCard label="Кафе" icon="cafe" time={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlatDetail);
