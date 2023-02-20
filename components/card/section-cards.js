import Card from "./card";
import styles from"./section-cards.module.css";
import clsx from "classnames";
import Link from "next/link";


const SectionCards = (props) => {
    const { title, videos = [], size, shouldWrap = false, shouldScale } = props;
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
                {videos.map((video, idx) => {
                    return (
                        <Link href={`/video/${video.id}`} key={video.id}>
                            <Card
                                    id={idx}
                                    imgUrl={video.imgUrl}
                                    size={size}
                                    shouldScale={shouldScale}
                            />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};
export default SectionCards;