import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../video/video.module.css";
import NavBar from "../../components/nav/navbar";
import clsx from "classnames";
import { getYoutubeVideoById } from "../../lib/videos";
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";
import {useEffect, useState} from "react";

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
    const  [ toggleLike, setToggleLike ] = useState(false);
    const  [ toggleDislike, setToggleDislike ] = useState(false);

    const router = useRouter();
    const videoId = router.query.videoId
    const {
        title,
        publishTime,
        description,
        channelTitle,
        statistics: { viewCount } = { viewCount: 0 },
    } = video;


    useEffect( () => {
        const handleLikeDislikeService = async () => {
            const response = await fetch(`/api/stats?videoId=${videoId}`, {
                method: "GET",
            });
            const data = await response.json();

            if (data.length > 0) {
                const favourite = data[0].favourite;
                if (favourite === 1) {
                    setToggleLike(true);
                } else if (favourite === 0) {
                    setToggleDislike(true);
                }
            }
        };
        handleLikeDislikeService();
    }, [videoId]);
    const runRatingService = async (favourite) => {
        return await fetch("/api/stats", {
            method: "POST",
            body: JSON.stringify({
                videoId,
                favourite,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const handleToggleLike = async () => {
        console.log("handleToggleLike");
        const val = !toggleLike;
        setToggleLike(val);
        setToggleDislike(toggleLike);

        const favourite = val ? 1 : 0;

        const response = await runRatingService(favourite)
        console.log("data", await response.json());
    };

    const handleToggleDislike = async () => {
        console.log("handleToggleDislike");
        const val = !toggleDislike;
        setToggleDislike(val);
        setToggleLike(toggleDislike);

        const favourite = val ? 0 : 1;

        const response = await runRatingService(favourite);
        console.log("data", await response.json());
    };

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
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
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