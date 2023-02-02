import { useAuthContext } from "../components/context/AuthContext";
import Link from "next/link";
//icons
import { BiChat, BiNews } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

function Home() {
  const IfNotUser = () => {
    return (
      <div className="grid">
        <p>
          <span className="font-bold px-1">Sign in </span> to start chat...
        </p>
        <Link href={"/feed"}>
          <button className="bg-cyan-600 rounded-md px-5 py-2 font-bold transition-colors hover:bg-cyan-400 capitalize flex gap-1 items-center mx-auto mt-2">
            Feed <BiNews />
          </button>
        </Link>
      </div>
    );
  };
  const links = [
    { link: "/feed", icon: <BiNews />, title: "feed" },
    { link: "/chat", icon: <BiChat />, title: "chat" },
    { link: "/profile", icon: <CgProfile />, title: "profile" },
  ];
  const IfUser = () => {
    return (
      <div className="flex gap-3">
        <ul className="grid gap-2 grid-cols-2 ">
          {links.map((link, id) => {
            return (
              <li
                className={`m-auto ${
                  id == links.length - 1 && (id + 1) % 2 !== 0
                    ? "col-span-2"
                    : ""
                }`}
                key={id}
              >
                <Link href={link.link}>
                  <button className="bg-cyan-600 rounded-md px-5 py-2 font-bold transition-colors hover:bg-cyan-400 capitalize flex gap-1 items-center ">
                    {link.title} {link.icon}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const { currentUser } = useAuthContext();

  return (
    <div
      className="my-auto mx-auto relative h-full flex
        justify-center items-center md:text-2xl text-lg w-2/3  text-center text-zinc-100 break-words
        
        "
    >
      {currentUser ? <IfUser /> : <IfNotUser />}
    </div>
  );
}

export default Home;
