"use client";

import { cities } from "@/config";
import styles from "@/page/Cities/styles.module.scss";
import { AppDispatch } from "@/store";
import { setCity } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Cities = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div className={`${styles.cities}`}>
      <h1>ВЫБОР ГОРОДА</h1>
      <input
        type="text"
        placeholder="Название города"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.citiesList}>
        {cities.map(
          (city, id) =>
            city.toLowerCase().includes(search.toLowerCase()) && (
              <h2
                key={id}
                onClick={() => {
                  dispatch(setCity(city));
                  router.push("/");
                }}
              >
                {city}
              </h2>
            )
        )}
      </div>
    </div>
  );
};

export default Cities;
