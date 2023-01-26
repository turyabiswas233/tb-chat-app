import { auth } from "../fbConf";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { FiLogIn, FiLogOut } from "react-icons/fi";
//icons
import { MdFace } from "react-icons/md";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const memo = useMemo(() => {
    return (
      <>
        <li>
          <Link href={currentUser ? "/chat" : "/"}>
            <a
              className="font-bold flex bg-friend_bg text-lime-100 px-4 p-2 rounded-full justify-center items-center w-fit gap-3 capitalize hover:text-green-500 transition-all"
              title={currentUser ? currentUser?.displayName : "Home"}
            >
              {currentUser ? (
                <span className="flex gap-1 items-center ">
                  {currentUser?.photoURL ? (
                    <Image
                      src={currentUser?.photoURL}
                      className="rounded-full "
                      height={25}
                      width={25}
                      alt={""}
                    />
                  ) : (
                    <MdFace />
                  )}{" "}
                  {currentUser?.displayName}
                </span>
              ) : (
                "home"
              )}
            </a>
          </Link>
        </li>

        <li>
          {currentUser ? (
            <button
              className={`font-bold flex justify-center ring-2 items-center ${
                currentUser
                  ? "hover:bg-rose-500 ring-rose-500"
                  : "hover:bg-emerald-400 ring-emerald-400"
              } py-2 px-4 rounded-full transition-colors hover:text-white`}
              type="submit"
              onClick={() => {
                signOut(auth);
              }}
            >
              sign out <FiLogOut />
            </button>
          ) : (
            <Link href={!currentUser && "/account/login"}>
              <a
                className={`font-bold flex justify-center items-center ring-offset-2 ring-0  ${
                  currentUser
                    ? "hover:bg-rose-500 ring-offset-rose-500"
                    : "hover:bg-emerald-400 ring-offset-emerald-400"
                } py-2 px-4 rounded-full transition-colors hover:text-white`}
              >
                Sign in <FiLogIn />
              </a>
            </Link>
          )}
        </li>
      </>
    );
  }, [currentUser]);
  return (
    <div className="sticky top-0 z-50 shadow-md">
      <ul
        className="flex justify-between items-center m-2 p-3 
       rounded-md text-[10px] gap-3
       text-center text-xs md:text-sm
       "
      >
        {memo}
      </ul>
    </div>
  );
}

export default Navbar;
