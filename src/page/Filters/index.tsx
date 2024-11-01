"use client";

import Button from "@/components/Button";
import Price from "@/components/Price";
import { useTypedSelector } from "@/hooks/selector.hook";
import { TParams } from "@/interfaces/params.interface";
import styles from "@/page/Filters/styles.module.scss";
import { AppDispatch } from "@/store";
import { setFlatsPrice, setNeighborsAge } from "@/store/slices/filters";
import { notFound } from "next/navigation";
import { FC, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Age from "@/components/Age";
import { maxFlatPrice, maxUsersAge } from "@/config";
import React from "react";

const Filters: FC<{ params: TParams }> = ({ params }) => {
  const currentFilters = useTypedSelector(
    (selector) => selector.filtersSlice.flats
  );
  const [priceFrom, setFiltersPriceFrom] = useState<number>(
    currentFilters.price.from
  );
  const [priceTo, setFiltersPriceTo] = useState<number>(
    currentFilters.price.to
  );
  const [ageFrom, setFiltersAgeFrom] = useState<number>(
    currentFilters.price.from
  );
  const [ageTo, setFiltersAgeTo] = useState<number>(currentFilters.price.to);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const page = params.page;

  if (
    !page ||
    typeof page != "string" ||
    !["flats", "neighbors"].includes(page)
  )
    return notFound();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (page) {
      case "flats":
        dispatch(setFlatsPrice({ from: priceFrom, to: priceTo }));
        break;
      case "neighbors":
        dispatch(setNeighborsAge({ from: ageFrom, to: ageTo }));
    }
    router.push("/" + page);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.filters}>
        {page === "flats" && (
          <div className={styles.price}>
            <h2>Цена (макс. {maxFlatPrice})</h2>
            <Price
              setFiltersPriceFrom={setFiltersPriceFrom}
              setFiltersPriceTo={setFiltersPriceTo}
            />
          </div>
        )}
        {page === "neighbors" && (
          <div className={styles.price}>
            <h2>Возраст (макс. {maxUsersAge})</h2>
            <Age
              setFiltersAgeFrom={setFiltersAgeFrom}
              setFiltersAgeTo={setFiltersAgeTo}
            />
          </div>
        )}
        <div className={styles.submit}>
          <Button type="submit">Сохранить</Button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Filters);
