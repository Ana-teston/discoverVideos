import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/legacy/image";
import {useState} from "react";
import {useRouter} from "next/router";

const Login = () => {

    const [userMsg, setUserMsg] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();
    const handleOnChangeEmail = (e) => {
        setUserMsg("");
        console.log("event", e);
        const email = e.target.value;
        setEmail(email);
    };
    const handleLoginWithEmail = (e) => {
        console.log("hi button");
        e.preventDefault();

        if(email) {
            if (email === "ana@example.com") {
                router.push("/")
                //go to the dashboard
                console.log('router to dashboard')
            } else {
                setUserMsg("something went wrong")
            }
        } else {
            setUserMsg("the email is not valid");
        };
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix Sign In</title>
            </Head>

        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <a className={styles.logoLink} href={"/"}>
                    <div className={styles.logoWrapper}>
                        <Image src={"/static/netflix.svg"} alt={"Netflix logo"} width={128} height={34}/>
                    </div>
                </a>
            </div>
        </header>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signInHeader}>Sign In</h1>
                    <input
                        type="text"
                        placeholder="Email address"
                        className={styles.emailInput}
                        onChange={handleOnChangeEmail}
                    />
                    <p className={styles.userMsg}>{userMsg}</p>
                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                        Sign In
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;