import styles from "@/components/MobileBottomMenu/styles.module.scss";
import { bigScreenSize, mobileBottomMenuIcons } from "@/config";
import Image from "next/image";
import Link from "next/link";

const MobileBottomMenu = () => {
  return (
    <div className={styles.mobileBottomMenu}>
      <ul>
        {mobileBottomMenuIcons.map((icon, i) => (
          <li key={i}>
            <Link href={icon[0]}>
              <Image
                priority
                src={`/icons/${icon[1]}.svg`}
                alt={icon[1]}
                width={100}
                height={100}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileBottomMenu;
