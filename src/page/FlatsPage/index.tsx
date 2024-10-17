"use client";

import Flat from "@/components/Flat";
import { FlatList, flats } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IRealFlat } from "@/interfaces/flat.interface";
import styles from "@/page/FlatsPage/styles.module.scss";
import { useEffect, useState } from "react";
import houseApi from "@/service/houseApi.service";
import userApi, { usrApi } from "@/service/userApi.service";
import { IRealUser } from "@/interfaces/user.interface";
import { userAgentFromString } from "next/server";

const Flats = () => {
  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.flats
  );
  const { data: user } = usrApi.useGetMeQuery();
  // console.log(user);
  // const filters = useTypedSelector((selector) => selector.filtersSlice.flats);
  const [fetchedFlats, setFetchedFlats] = useState<IRealFlat[]>([]);
  useEffect(() => {
    (async () => {
      const fetched = await houseApi.listHouses();
      setFetchedFlats(fetched);
    })();
  }, []);
  const [flats, setFlats] = useState<IRealFlat[]>(FlatList);
  return (
    <div className={styles.flats}>
      <div className={styles.container}>
        {fetchedFlats.map(
          (flat) => (
            // flat.user.name.toLowerCase().startsWith(search.toLowerCase()) &&
            // flat.price <= filters.price.to &&
            // flat.price >= filters.price.from && (
            <div className={styles.flat} key={flat.id.toString()}>
              <Flat flat={flat} />
            </div>
          )
          
          // )
        )}
      </div>
      {/* //for testing some queries */}
      {/* <button onClick={async ()=>{
        const fetched = await userApi.getMe();
        console.log("aaaa")
        console.log(fetched);
      }}>FETCH</button> */}
    </div>
  );
};

export default Flats;

