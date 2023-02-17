import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from "../video/video.module.css"

Modal.setAppElement('#__next');
const Video = () => {
    const router = useRouter();
    console.log({router});
    return (
        <div>
            Get Videos Page {router.query.videoId}
            <Modal
                isOpen={true}
                contentLabel="watch the video"
                onRequestClose={() => router.back}
                overlayClassName={styles.overlay}
            >
                <div>Modal Body</div>
            </Modal>
        </div>)
}

export default Video;