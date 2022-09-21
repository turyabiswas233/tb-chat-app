import Head from "next/head";
import Navbar from "../components/Navbar";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen">
      <Head>
        <title>TB Chat App</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
