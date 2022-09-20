import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../fbConf";
import { collection, getDocs } from "firebase/firestore";
function Sidbar() {
  const user = auth.currentUser;
  const route = useRouter();
  const [chatlist, setlist] = useState([]);

  useEffect(() => {
    try {
      async function Data() {
        const users = collection(db, `groups`);
        const userList = await getDocs(users);
        setlist(
          userList.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
      Data();
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  const memo = useMemo(() => {
    return chatlist?.map((ele) => {
      if (ele?.email != user?.email)
        return (
          <li
            key={ele?.id}
            className="dark:bg-zinc-700 
              bg-zinc-300 hover:bg-zinc-500  cursor-pointer 
              my-1 p-2 hover:text-zinc-200
              rounded-md 
              gap-1
          "
            onClick={() => {
              route.push(`/chat/${ele?.id}`);
            }}
          >
            <p className="text-sm tracking-tight">{ele?.grpname}</p>
          </li>
        );
    });
  }, [chatlist]);
  return (
    <div className=" p-3 dark:bg-zinc-900 bg-zinc-200 rounded-md h-full relative">
      <ul>{memo}</ul>
    </div>
  );
}

export default Sidbar;
