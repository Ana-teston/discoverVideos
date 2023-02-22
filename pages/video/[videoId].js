import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../video/video.module.css";
import NavBar from "../../components/nav/navbar";
import clsx from "classnames";
import { getYoutubeVideoById } from "../../lib/videos";
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";
import {useState} from "react";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
    const videoId = context.params.videoId;

    const videoArray = await getYoutubeVideoById(videoId);
    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        revalidate: 10, // In seconds
    };
}
export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }));
    return { paths, fallback: "blocking" };
}
const Video = ({ video }) => {
    const router = useRouter();
    console.log({ router });
    const {
        title,
        publishTime,
        description,
        channelTitle,
        statistics: { viewCount } = { viewCount: 0 },
    } = video;

    const  [ toggleLike, setToggleLike ] = useState(false);
    const  [ toggleDislike, setToggleDislike ] = useState(false);

    const handleToggleLike = () => {
        console.log("handleToggleLike");
        setToggleLike(!toggleLike);
        setToggleDislike(toggleLike);
    }

    const handleToggleDislike = () => {
        console.log("handleToggleDislike");
        setToggleDislike(!toggleDislike);
        setToggleLike(toggleDislike);
    }

    return (
        <div className={styles.container}>
            <NavBar />
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <iframe
                    id="ytplayer"
                    className={styles.videoPlayer}
                    type="text/html"
                    width="100%"
                    height="360"
                    src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                    frameBorder="0"
                ></iframe>
                <div className={styles.likeDislikeBtnWrapper}>
                    <div className={styles.likeBtnWrapper}>
                        <button onClick={handleToggleLike}>
                            <div className={styles.btnWrapper}>
                                <Like selected={toggleLike} />
                            </div>
                        </button>
                        <button onClick={handleToggleDislike}>
                            <div className={styles.btnWrapper}>
                                <DisLike selected={toggleDislike} />
                            </div>
                        </button>
                    </div>
                </div>



                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.text}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle}</span>
                            </p>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>{viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default Video;