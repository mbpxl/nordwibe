import styles from "@/components/LinkCard/styles.module.scss";
import Image from "next/image";
import React from "react";
import { FC } from "react";

interface ILinkCard {
  image: string;
  text: string;
  text_two?: string;
}

const LinkCard: FC<ILinkCard> = ({ image, text, text_two }) => {
  return (
    <div className={styles.LinkCard}>
      <Image
        unoptimized
        src={`/linkCards/${image}.png`}
        alt={text}
        width={300}
        height={300}
      />
      {!text_two && <span>{text}</span>}

      {text_two && (
        <div className={styles.text_content}>
          <div>
            <span>{text}</span>
          </div>
          <div>
            <span>{text_two}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LinkCard);
