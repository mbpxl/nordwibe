import styles from "@/components/Post/styles.module.scss"
import Image from "next/image";
import { useState } from "react";

const Post = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  return <div className={styles.post}>
    <div className={styles.user}>
      <div className={styles.avatar}>
        <Image src={"/icons/userProfile.svg"} alt="avatar" width={100} height={100} />
      </div>
      <div className={styles.userInformation}>
        <h1>Владислав</h1>
        <h4>10 авг в 10:00</h4>
      </div>
    </div>
    <div className={styles.image}>
      <Image src={"/post.png"} alt="cover" width={1000} height={1000} />
    </div>
    <div className={styles.buttons}>
      <div className={`${styles.block} ${isLiked && styles.liked}`} onClick={() => setIsLiked(!isLiked)}>
        <p>{isLiked ? 1 : 0}</p>
        <Image src={"/icons/postLike.svg"} alt="like" width={100} height={100} />
      </div>
      <div className={styles.block}>
        <Image src={"/icons/postComment.svg"} alt="comment" width={100} height={100} />
      </div>
      <div className={styles.block}>
        <Image src={"/icons/postShare.svg"} alt="share" width={100} height={100} />
      </div>
    </div>
  </div>
}

export default Post;