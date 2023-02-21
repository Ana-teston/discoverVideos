import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import Image from "next/legacy/image";
import {magic} from "../../lib/magic-client";

const NavBar = () => {

    const [showDropdown, setShowDropdown] = useState();
    const [username, setUsername] = useState("");

    const router = useRouter();

    useEffect(() => {
        async function getUsername() {
            try {
                const { email, issuer } = await magic.user.getMetadata();
                const didToken = await magic.user.getIdToken();
                console.log({didToken});
                if (email) {
                    console.log(email);
                    setUsername(email);
                }
            } catch (error) {
                console.log("Error retrieving email:", error);
            }
        }
        getUsername();
    }, []);

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

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn()); // => `false`
            router.push("/login");
        } catch (error) {
            // Handle errors if required!
            console.error("error logging out email", error);
            router.push("/login");
        }
    }

    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <a className={styles.logoLink} href={"/"}>
                <div className={styles.logoWrapper}>
                    <Image src={"/static/netflix.svg"} alt={"Netflix logo"} width={128} height={34}/>
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
                        <Image src={"/static/expand_more.svg"} alt={"expand dropdown icon"} width={24} height={24}/>
                    </button>
                    {showDropdown && (
                    <div className={styles.navDropdown}>
                        <a className={styles.linkName} onClick={handleSignOut}>Sign out of Netflix</a>
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