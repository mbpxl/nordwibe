import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ArrowLeft from "../../../public/svgs/arrowLeft";
import Mark from "../../../public/svgs/mark";
import styles from "../Filter/styles.module.scss";
import { YMaps, Map, GeoObject } from "@pbe/react-yandex-maps";
import ExitF from "../../../public/svgs/exitF";
import FitlerToggle from "../FilterToggle";
import {
  appliances,
  comfort,
  houseType,
  repair,
  soundIsolation,
} from "@/config";
import { IFilterResult } from "@/interfaces/filter_answer.interface";
import React from "react";

interface IFilter {
  setFilter?: Dispatch<SetStateAction<boolean>>;
}

const Filter: FC<IFilter> = ({ setFilter }) => {
  const [addressCoord, setAddressCoord] = useState([55.75, 37.57]);
  const distance = useRef<HTMLInputElement>(null);
  const min_count_days = useRef<HTMLInputElement>(null);
  const max_count_days = useRef<HTMLInputElement>(null);
  const [daysError, setDaysError] = useState(false);
  const min_cost = useRef<HTMLInputElement>(null);
  const max_cost = useRef<HTMLInputElement>(null);
  const [costError, setCostError] = useState(false);
  const min_cost_utilities = useRef<HTMLInputElement>(null);
  const max_cost_utilities = useRef<HTMLInputElement>(null);
  const [utilError, setUtilError] = useState(false);
  const min_count_rooms = useRef<HTMLInputElement>(null);
  const max_count_rooms = useRef<HTMLInputElement>(null);
  const [roomError, setRoomError] = useState(false);
  const min_floor = useRef<HTMLInputElement>(null);
  const max_floor = useRef<HTMLInputElement>(null);
  const [floorError, setFloorError] = useState(false);
  const min_building_floor = useRef<HTMLInputElement>(null);
  const max_building_floor = useRef<HTMLInputElement>(null);
  const [buildError, setBuildError] = useState(false);
  const min_count_photos = useRef<HTMLInputElement>(null);
  const [activeRepair, setActiveRepair] = useState(0);
  const [activeBuild, setActiveBuild] = useState(0);
  const [activeSound, setActiveSound] = useState(0);
  // const [activeRepair, setActiveRepair] = useState(0);

  const [map, setMap] = useState(false);
  const [city, setCity] = useState<string>("Москва");
  const mapRef = useRef();
  const [ymap, setYmap] = useState();

  const onClickToMap = async (e: any, ymaps?: any) => {
    const coords = e.get("coords");
    setAddressCoord(coords);
    ymaps.geocode(coords).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setCity(firstGeoObject.getAddressLine());
    });
  };

  const HandleMapInput = async (
    value: React.FormEvent<HTMLInputElement>,
    ymaps?: any
  ) => {
    setCity(value.currentTarget.value);
    ymaps.geocode(value.currentTarget.value).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setAddressCoord(firstGeoObject.geometry._coordinates);
    });
  };

  const handleInputChange = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      CheckError();
      // Фильтруем только числовые значения
      if (!/^\d*$/.test(newValue)) {
        inputRef.current.value = newValue.replace(/[^\d]/g, "");
      }
    }
  };

  const CheckError = () => {
    if (min_count_days.current && max_count_days.current) {
      if (+min_count_days.current.value > +max_count_days.current.value) {
        setDaysError(true);
      } else {
        setDaysError(false);
      }
    }
    if (min_cost.current && max_cost.current) {
      if (+min_cost.current.value > +max_cost.current.value) {
        setCostError(true);
      } else {
        setCostError(false);
      }
    }
    if (min_cost_utilities.current && max_cost_utilities.current) {
      if (
        +min_cost_utilities.current.value > +max_cost_utilities.current.value
      ) {
        setUtilError(true);
      } else {
        setUtilError(false);
      }
    }
    if (min_building_floor.current && max_building_floor.current) {
      if (
        +min_building_floor.current.value > +max_building_floor.current.value
      ) {
        setBuildError(true);
      } else {
        setBuildError(false);
      }
    }
    if (min_floor.current && max_floor.current) {
      if (+min_floor.current.value > +max_floor.current.value) {
        setFloorError(true);
      } else {
        setFloorError(false);
      }
    }
    if (min_count_rooms.current && max_count_rooms.current) {
      if (+min_count_rooms.current.value > +max_count_rooms.current.value) {
        setRoomError(true);
      } else {
        setRoomError(false);
      }
    }
  };

  const geocode = (ymaps: any) => {
    setYmap(ymaps);
  };

  const [filterResult, setFilterResult] = useState<IFilterResult>({
    search_point: [0, 0],
    distance: 10000000000,
    i_am_owner: true,
    min_count_days: 0,
    max_count_days: 0,
    min_cost: 0,
    max_cost: 0,
    is_have_bail: true,
    is_have_fines: true,
    min_cost_utilities: 0,
    max_cost_utilities: 0,
    min_count_rooms: 0,
    max_count_rooms: 0,
    min_floor: 0,
    max_floor: 0,
    min_building_floor: 0,
    max_building_floor: 0,
    repair_type: 0,
    building_type: 0,
    sound_insulation_type: 0,
    accessibility_type: 0,
    is_sunny_side: true,
    is_have_elevator: true,
    is_have_balcony: true,
    is_have_parking_space: true,
    is_have_security: true,
    is_have_horizontal_bars: true,
    is_have_conditioner: true,
    is_have_garbage_chute: true,
    is_have_wifi: true,
    is_have_transport_close: true,
    is_possible_smoke: true,
    is_possible_animals: true,
    is_have_washing_machine: true,
    is_have_dryer: true,
    is_have_iron: true,
    is_have_dishwasher: true,
    is_have_hair_dryer: true,
    is_have_tv: true,
    is_have_guest_table: true,
    is_have_guest_cabinet: true,
    min_count_photos: 0,
    search: "",
    is_favorite: true,
  });

  useEffect(() => {
    // function login_a() {
    //   fetch("https://3133319-bo35045.twc1.net/api/v0/login/", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Authorization: `Basic ${btoa("+79878199999:010101ggg")}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((response) => console.log(response))
    //     .then((res) => list_a())
    //     .catch((error) => {
    //       console.error("Request failed:", error);
    //     });
    // }
    // login_a();
    // function list_a() {
    //   fetch("https://3133319-bo35045.twc1.net/api/v0/users/", {
    //     method: "GET",
    //     credentials: "include",
    //   })
    //     .then((response) => console.log(response))
    //     .catch((error) => console.log(error));
    // }
  }, []);

  return (
    <div className={styles.filter}>
      {map && (
        <>
          <div className={styles.map_popup}>
            <div className={styles.exit} onClick={() => setMap(false)}>
              <ExitF color="#fff" />
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Ваш ответ"
              value={city}
              onChange={(value) => HandleMapInput(value, ymap)}
            />
            <div className={styles.map}>
              <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
                <Map
                  style={{ width: "98%", height: "90%" }}
                  instanceRef={mapRef}
                  onLoad={(ymaps) => geocode(ymaps)}
                  onClick={(e: any) => onClickToMap(e, ymap)}
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
            </div>
          </div>
        </>
      )}
      <div className={styles.filter_page}>
        <div className={styles.header}>
          <span className={styles.title}>Фильтры</span>
          <div
            className={styles.exit}
            onClick={() => (setFilter ? setFilter(false) : "")}
          >
            <ExitF />
          </div>
          {/* <div className={styles.to_default}>Сбросить</div> */}
        </div>
        <div className={styles.filter_content}>
          <div className={styles.content_line}>
            <div className={styles.place}>
              <div className={styles.place_title}>Расположение</div>
              <div className={styles.placemark} onClick={() => setMap(true)}>
                <div className={styles.item_icon}>
                  <Mark />
                </div>
                <div className={styles.placemart_content}>
                  <span className={styles.placemark_title}>{city}</span>
                  <span className={styles.placemark_subtitle}>
                    метро,район,адрес,ЖК
                  </span>
                </div>
                <div className={styles.arrow_icon}>
                  <ArrowLeft />
                </div>
              </div>
              <div className={styles.place_radius}>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={"100000000"}
                  ref={distance}
                  onChange={(v) => handleInputChange(distance)}
                />
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <FitlerToggle id="owner" text="Только от собственника" />
          </div>
          <div className={styles.content_line}>
            <div className={styles.max_min_inputs}>
              <div className={styles.title}>На какой срок (в днях)</div>
              <div className={daysError ? styles.error : styles.hide_error}>
                минимальное значение не может больше максимального
              </div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input
                    className={styles.input}
                    placeholder="От"
                    ref={min_count_days}
                    onChange={(v) => handleInputChange(min_count_days)}
                  />
                </div>
                <div className={styles.max_input}>
                  <input
                    className={styles.input}
                    placeholder="и до"
                    ref={max_count_days}
                    onChange={(v) => handleInputChange(max_count_days)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.max_min_inputs}>
              <div className={styles.title}>Цена</div>
              <div className={costError ? styles.error : styles.hide_error}>
                минимальное значение не может больше максимального
              </div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input
                    className={styles.input}
                    placeholder="Цена от"
                    ref={min_cost}
                    onChange={(v) => handleInputChange(min_cost)}
                  />
                </div>
                <div className={styles.max_input}>
                  <input
                    className={styles.input}
                    placeholder="и до"
                    ref={max_cost}
                    onChange={(v) => handleInputChange(max_cost)}
                  />
                </div>
              </div>
            </div>
          </div>
          <h3 className={styles.big_title}>О квартире</h3>
          <div className={styles.content_line} id={styles.no_gap}>
            <FitlerToggle id="deposit" text="Есть залог" />

            <FitlerToggle id="penalty" text="Есть штрафы" />
          </div>
          <div className={styles.content_line}>
            <div className={styles.max_min_inputs}>
              <div className={styles.title}>Комуннальный услуги</div>
              <div className={utilError ? styles.error : styles.hide_error}>
                минимальное значение не может больше максимального
              </div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input
                    className={styles.input}
                    placeholder="Цена от"
                    ref={min_cost_utilities}
                    onChange={(v) => handleInputChange(min_cost_utilities)}
                  />
                </div>
                <div className={styles.max_input}>
                  <input
                    className={styles.input}
                    placeholder="и до"
                    ref={max_cost_utilities}
                    onChange={(v) => handleInputChange(max_cost_utilities)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.max_min_inputs}>
              <div className={styles.title}>Количество комнат</div>
              <div className={roomError ? styles.error : styles.hide_error}>
                минимальное значение не может больше максимального
              </div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input
                    className={styles.input}
                    placeholder="От"
                    ref={min_count_rooms}
                    onChange={(v) => handleInputChange(min_count_rooms)}
                  />
                </div>
                <div className={styles.max_input}>
                  <input
                    className={styles.input}
                    placeholder="и до"
                    ref={max_count_rooms}
                    onChange={(v) => handleInputChange(max_count_rooms)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.max_min_inputs}>
              <div className={styles.title}>Этаж квартиры</div>
              <div className={floorError ? styles.error : styles.hide_error}>
                минимальное значение не может больше максимального
              </div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input
                    className={styles.input}
                    placeholder="От"
                    ref={min_floor}
                    onChange={(v) => handleInputChange(min_floor)}
                  />
                </div>
                <div className={styles.max_input}>
                  <input
                    className={styles.input}
                    placeholder="и до"
                    ref={max_floor}
                    onChange={(v) => handleInputChange(max_floor)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.max_min_inputs}>
              <div className={styles.title}>Всего этажей</div>
              <div className={buildError ? styles.error : styles.hide_error}>
                минимальное значение не может больше максимального
              </div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input
                    className={styles.input}
                    placeholder="От"
                    ref={min_building_floor}
                    onChange={(v) => handleInputChange(min_building_floor)}
                  />
                </div>
                <div className={styles.max_input}>
                  <input
                    className={styles.input}
                    placeholder="и до"
                    ref={max_building_floor}
                    onChange={(v) => handleInputChange(max_building_floor)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Тип ремонта</div>
            <div className={styles.toggle_list}>
              {repair.map((tog, ind) => {
                return (
                  <div
                    key={ind}
                    className={`${styles.toggle} ${
                      activeRepair === ind ? styles.choosen_toggle : ""
                    }`}
                    onClick={() => setActiveRepair(ind)}
                  >
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Тип здания</div>
            <div className={styles.toggle_list}>
              {houseType.map((tog, ind) => {
                return (
                  <div
                    key={ind}
                    className={`${styles.toggle} ${
                      activeBuild === ind ? styles.choosen_toggle : ""
                    }`}
                    onClick={() => setActiveBuild(ind)}
                  >
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Звукоизоляция</div>
            <div className={styles.toggle_list}>
              {soundIsolation.map((tog, ind) => {
                return (
                  <div
                    key={ind}
                    className={`${styles.toggle} ${
                      activeSound === ind ? styles.choosen_toggle : ""
                    }`}
                    onClick={() => setActiveSound(ind)}
                  >
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Доступность</div>
            <div className={styles.toggle_list}>
              {soundIsolation.map((tog, ind) => {
                return (
                  <div
                    key={ind}
                    className={`${styles.toggle} ${
                      activeRepair === ind ? styles.choosen_toggle : ""
                    }`}
                  >
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.comfort}>
              <div className={styles.title}>Комфорт</div>
              <div className={styles.content}>
                <div className={styles.toggle_list}>
                  {comfort.map((tog, ind) => {
                    return (
                      <div
                        key={ind}
                        className={`${styles.toggle} ${styles.choosen_toggle}`}
                      >
                        {tog}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.two_toggles}>
              <FitlerToggle id="smoke" text="Можно курить" />
              <FitlerToggle id="pets" text="Можно с животными" />
            </div>
          </div>

          <div className={styles.content_line}>
            <div className={styles.comfort}>
              <div className={styles.title}>В квартире есть</div>
              <div className={styles.content}>
                <div className={styles.toggle_list}>
                  {appliances.map((tog, ind) => {
                    return (
                      <div
                        key={ind}
                        className={`${styles.toggle} ${styles.choosen_toggle}`}
                      >
                        {tog}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.photo_count_and_only_favorites}>
              <span className={styles.title}>Минимум фоторгафий</span>
              <input
                type="text"
                className={styles.input}
                defaultValue={0}
                ref={min_count_photos}
                onChange={(v) => handleInputChange(min_count_photos)}
              />
              <FitlerToggle
                id="favorits"
                text="Показывать только избранные объявления"
              />
            </div>
            <div className={styles.description}>
              <span className={styles.title}>Описание квартиры</span>
              <input type="text" className={styles.input} />
            </div>
          </div>
        </div>
        <div className={styles.content_line_max}>
          <button className={styles.show_result}>Показать</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Filter);
