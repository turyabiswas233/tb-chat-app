import Head from "next/head";
import { useRouter } from "next/router";
import {
  AuthContextProvider,
  useAuthContext,
  user,
} from "../components/context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import LeftSidbar from "../components/LeftSidbar";
import CookieConfirm from "../components/getCookie";
import PopupLogin from "../components/PopupLogin";
import { useEffect, useState } from "react";
function MyApp({ Component, pageProps }) {
  const rout = useRouter();
  const path = rout.pathname;
  const isChatpanel = path.includes("chat");
  const [showPop, setShowPop] = useState(false);
  const { currentUser } = useAuthContext();
  useEffect(() => {
    const loop = setTimeout(() => {
      setShowPop(true);
      return clearTimeout(loop);
    }, 3000);
  });
  return (
    <AuthContextProvider>
      <div className="relative h-screen overflow-none flex flex-col bg-primary_bg_dark text-msg_txt">
        <Head>
          <title>Trustenger</title>
        </Head>
        <Navbar />

        <CookieConfirm />

        <div className="flex overflow-auto relative w-full h-full bottom-0 pb-0">
          <LeftSidbar path={isChatpanel} isUser={user} />
          <Component {...pageProps} />
        </div>
        {!currentUser && <PopupLogin show={showPop} />}
      </div>
    </AuthContextProvider>
  );
}

export default MyApp;
