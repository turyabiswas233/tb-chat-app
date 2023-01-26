import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthContextProvider, user } from "../components/context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import LeftSidbar from "../components/LeftSidbar";

function MyApp({ Component, pageProps }) {
  const rout = useRouter();
  const path = rout.pathname;
  const isChatpanel = path.includes("chat");
  const { currentUser } = useContext(user);

  return (
    <AuthContextProvider>
      <div className="relative h-screen overflow-none flex flex-col bg-primary_bg_dark text-msg_txt">
        <Head>
          <title>Trustenger</title>
        </Head>
        <Navbar />
        <div className="flex overflow-auto relative w-full h-full bottom-0 pb-0">
          <LeftSidbar path={isChatpanel} isUser={currentUser} />

          <Component {...pageProps} />
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default MyApp;
