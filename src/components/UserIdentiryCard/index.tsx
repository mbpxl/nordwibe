import styles from "@/components/UserIdentiryCard/styles.module.scss"
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"

interface IUserIdentityCard {
  name: string,
  id: number
}

const UserIdentityCard: FC<IUserIdentityCard> = ({ id, name }) => {
  return <Link href={`/profile/${id}`}>
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image src={"/icons/userProfile.svg"} alt="avatar" width={100} height={100} />
      </div>
      <h4>{name.split(" ")[0]}</h4>
      <h4>{name.split(" ")[1]}</h4>
    </div>
  </Link>
}

export default UserIdentityCard;