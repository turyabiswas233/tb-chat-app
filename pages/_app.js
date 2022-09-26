import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../fbConf";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const user = auth.currentUser;
  const [us, setus] = useState();
  const router = useRouter();
  useState(() => {
    if (user) {
      router.push("/chat");
    }
  }, [us]);
  return (
    <div className="h-screen relative flex flex-col gap-2 selection:bg-slate-600 selection:text-zinc-900">
      <Head>
        <title>TB Chat App</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
