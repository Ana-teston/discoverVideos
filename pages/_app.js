import '../styles/globals.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {magic} from "../lib/magic-client";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect( () => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn){
        //router to /
        router.push("/");
      } else {
        // router to /login
        router.push("/login")
      }
    };
    handleLoggedIn()
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    }
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
