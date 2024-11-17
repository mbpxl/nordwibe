"use client";

import Flat from "@/components/Flat";
import { FlatList } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IRealFlat } from "@/interfaces/flat.interface";
import styles from "@/page/FlatsPage/styles.module.scss";
import { useEffect, useState } from "react";
import houseApi, { useListHouseQuery } from "@/service/houseApi.service";
import { usrApi } from "@/service/userApi.service";
import React from "react";

const Flats = () => {
  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.flats
  );
  //TODO: const { data: user } = usrApi.useGetMeQuery();

  const { data: flats, error, isLoading } = useListHouseQuery();

  const [fetchedFlats, setFetchedFlats] = useState<IRealFlat[]>([]);

  useEffect(() => {
    if (flats) {
      setFetchedFlats(flats);
    }
  }, [flats]);

  return (
    <div className={styles.flats}>
      <div className={styles.container}>
        {fetchedFlats.map((flat) => (
          <div className={styles.flat} key={flat.id.toString()}>
            <Flat flat={flat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Flats);
