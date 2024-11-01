import styles from "@/components/Favourites/User/styles.module.scss";
import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import React from "react";
import { FC } from "react";

const FavouritesUser: FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>
        <Image
          src={"/icons/userProfile.svg"}
          alt="avatar"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.userInformation}>
        <h3>{user.name}</h3>
        <h3>{user.city}</h3>
      </div>
    </div>
  );
};

export default React.memo(FavouritesUser);
