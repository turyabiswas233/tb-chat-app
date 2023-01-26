import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../fbConf";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
//icons
import { GrGroup } from "react-icons/gr";
import Loading from "../loading/loading";
import { MdGroup } from "react-icons/md";

export const UserList = createContext();

//call group from database
export function useCallGroup() {
  const [groups, setgroups] = useState([]);
  const grpRef = collection(db, "groups");
  const [snap, load, error] = useCollection(grpRef);
  useEffect(() => {
    setgroups([]);
    snap?.docs.map((doc) =>
      setgroups((pre) => [
        ...pre,
        {
          id: doc.id,
          grpname: doc.get("grpname"),
        },
      ])
    );
  }, [snap]);
  return { groups, load, error };
}
//main function
export const UserContext = ({ create }) => {
  const route = useRouter();
  const { id } = route.query;
  const { groups, load, error } = useCallGroup();
  return (
    <UserList.Provider value={groups}>
      <ul className="w-full p-2 h-full overflow-y-auto sidbox">
        {load && (
          <>
            <div
              className="relative h-full flex
        justify-center items-center
        "
            >
              <Loading />
            </div>
          </>
        )}
        {groups?.length != 0 ? (
          groups?.map((ele, ind) => {
            return (
              <li
                key={ind}
                className={` flex overflow-x-hidden items-center cursor-pointer my-4 py-1 h-10 md:h-16 mx-auto overflow-hidden transition-all  ${
                  !create
                    ? "rounded-full w-10 md:w-full"
                    : "rounded-md w-full md:w-full"
                } md:rounded-sm hover:ring-4 hover:ring-cyan-500 bg-white ${
                  id == ele?.id
                    ? " text-activeTab ring-4 font-bold ring-activeRing"
                    : " text-inactivetxt"
                }              
          `}
                onClick={() => {
                  route.push(`/chat/${ele?.id}`);
                }}
              >
                {/* desktop view */}
                <p
                  className={`text-md pc tracking-tight w-full h-auto flex items-center justify-center gap-2 p-2 `}
                >
                  <span className={`p-2 rounded-full mx-auto w-fit `}>
                    <MdGroup />
                  </span>
                  <span
                    className={`md:block flex-1 ${create ? "flex" : "hidden"} `}
                  >
                    {ele?.grpname}
                  </span>
                </p>
              </li>
            );
          })
        ) : (
          <>
            <div
              className="h-full flex max-w-fit justify-center my-4
        "
            >
              <p className="md:text-2xl text-lg capitalize text-center text-zinc-500 break-words">
                Create A New group to start chat
              </p>
            </div>
          </>
        )}
        {error && <li>Error to show group list</li>}
      </ul>
    </UserList.Provider>
  );
};
