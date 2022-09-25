import { auth } from "../fbConf";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
function Navbar() {
  const user = auth.currentUser;
  const [us, setuser] = useState();
  const rout = useRouter();
  const { id } = rout.query;
  useEffect(() => {
    setuser(user);
  }, [user]);

  const memo = useMemo(() => {
    return (
      <>
        <li className="font-bold flex dark:bg-gray-600 bg-gray-400 p-1 md:p-2 rounded-full justify-center items-center w-fit">
          {id ? <Link href={"/chat"}>Private Message</Link> : "Private Message"}
        </li>

        {us ? (
          <li className="font-bold flex gap-3 justify-center items-center">
            {us?.photoURL && (
              <Image
                src={us?.photoURL}
                className="rounded-full "
                height={25}
                width={25}
                alt={""}
              />
            )}{" "}
            {us.displayName}
          </li>
        ) : (
          <li></li>
        )}
        <li className="font-bold flex justify-center items-center">
          {us ? (
            <button
              type="submit"
              onClick={() => {
                signOut(auth).then(() => {
                  rout.push("/");
                });
              }}
            >
              sign out
            </button>
          ) : (
            <Link href={"/login"}>Sign in</Link>
          )}
        </li>
      </>
    );
  }, [us]);
  return (
    <div className="sticky top-0 z-50">
      <ul
        className="flex justify-between items-center m-2 p-3
       dark:bg-slate-700 bg-slate-300 dark:text-amber-100 
       rounded-md text-[10px] md:text-lg gap-3
       text-center
       "
      >
        {memo}
      </ul>
    </div>
  );
}

export default Navbar;
