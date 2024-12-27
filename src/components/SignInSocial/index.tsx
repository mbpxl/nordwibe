import Link from "next/link";
import React, { useState } from "react";
import VKLOGO from "../../../public/svgs/vk";
import YandexLogo from "../../../public/svgs/yandex";
import styles from "./styles.module.scss";

//@ts-ignore
const Modal = ({ onClose, message }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{message}</h2>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default React.memo(function SignWith() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //@ts-ignore
  const handleLinkClick = (platform) => {
    setModalMessage(
      `Что-то пошло не так: вход через ${platform} пока-что не работает`
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.or}>или</div>
      <div className={styles.links}>
        <Link href={""} onClick={() => handleLinkClick("ВК")} passHref>
          <VKLOGO />
        </Link>
        <Link href={""} onClick={() => handleLinkClick("Яндекс")} passHref>
          <YandexLogo />
        </Link>
      </div>

      {isModalOpen && <Modal onClose={closeModal} message={modalMessage} />}
    </>
  );
});
