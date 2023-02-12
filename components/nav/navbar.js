import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import {useState} from "react";

const NavBar = (props) => {
    const {username} = props;
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState();

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push('/');
    };
    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push('/browse/MyList');
    };

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    };

    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <a className={styles.logoLink} href={"/"}>
                <div className={styles.logoWrapper}>
                    Netflix
                </div>
            </a>
            <ul className={styles.navItems}>
                <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                <li className={styles.navItem} onClick={handleOnClickMyList}>My List</li>
            </ul>
            <nav className={styles.navContainer}>
                <div>
                    <button onClick={handleShowDropdown} className={styles.usernameBtn}>
                        <p className={styles.username}>{username}</p>
                        {/** expend more icon */}
                    </button>
                    {showDropdown && (
                    <div className={styles.navDropdown}>
                        <Link href="/login" legacyBehavior>
                            <a className={styles.linkName}>Sign out of Netflix</a>
                        </Link>
                        <div className={styles.lineWrapper}></div>
                    </div>
                    )}
                </div>
            </nav>
        </div>
    </div>
    )
}

export default NavBar;