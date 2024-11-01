import Link from "next/link";
import React from "react";
import VKLOGO from "../../../public/svgs/vk";
import YandexLogo from "../../../public/svgs/yandex";
import styles from "./styles.module.scss";

export default React.memo(function SignWith() {
  return (
    <>
      <div className={styles.or}>или</div>
      <div className={styles.links}>
        <Link href={""}>
          <VKLOGO />
        </Link>
        <Link href={""}>
          <YandexLogo />
        </Link>
      </div>
    </>
  );
});
