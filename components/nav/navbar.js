import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import Image from "next/legacy/image";
import {magic} from "../../lib/magic-client";
import Link from "next/link";

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState("");
    const [didToken, setDidToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const applyUsernameInNav = async () => {
            try {
                const { email, issuer } = await magic.user.getMetadata();
                const didToken = await magic.user.getIdToken();
                if (email) {
                    setUsername(email);
                    setDidToken(didToken);
                }
            } catch (error) {
                console.error("Error retrieving email", error);
            }
        };
        applyUsernameInNav();
    }, []);

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push("/");
    };

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list");
    };

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    };

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${didToken}`,
                    "Content-Type": "application/json",
                },
            });

            const res = await response.json();
        } catch (error) {
            console.error("Error logging out", error);
            router.push("/login");
        }
    };

    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <Link legacyBehavior className={styles.logoLink} href={"/"}>
                <a>
                    <div className={styles.logoWrapper}>
                        <Image src={"/static/netflix.svg"}
                               alt={"Netflix logo"}
                               width={128}
                               height={34}/>
                    </div>
                </a>
            </Link>
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