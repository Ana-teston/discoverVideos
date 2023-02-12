import Image from "next/image";
import styles from "./card.module.css"
import {useState} from "react";

const Card = (props) => {
    const {imgUrl = "/static/photo.jp", size = "medium"} = props;

    const [imgSrc, setImgSrc]  = useState(imgUrl);

    const classMap = {
        'large': styles.lgItem,
        'medium': styles.mdItem,
        'small': styles.smItem,
    };

    const handleOnError = () => {
        console.log("hii error");
        setImgSrc("/static/photo.jpg");
    };

    return (
        <div className={styles.container}>
            Card
            <div className={classMap[size]}>
                <Image
                    src={imgSrc}
                    alt="image"
                    layout="fill"
                    onError={handleOnError}
                    className={styles.cardImg}
                />
            </div>
        </div>
    );
};

export default Card;