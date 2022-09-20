import Navbar from "../components/Navbar";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
