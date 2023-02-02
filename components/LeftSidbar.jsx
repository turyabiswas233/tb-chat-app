import { useState } from "react";
import { db } from "../fbConf";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { MdClose, MdMenu } from "react-icons/md";
import { UserContext } from "./context/UserContext";
import { useAuthContext } from "./context/AuthContext";
//icons
import { BiMessageRoundedAdd } from "react-icons/bi";

function LeftSidbar({ path, isUser }) {
  const [create, setCreate] = useState(false);
  const grpRef = collection(db, "groups");
  const { currentUser } = useAuthContext();

  // create new groups
  function handleCreate() {
    setCreate(!create);
  }

  // add new group to db
  const [grp, setgrp] = useState("");
  async function createGroup(e) {
    e?.preventDefault();
    const wrds = grp;

    await addDoc(grpRef, {
      grpname: wrds,
      admin: currentUser?.email,
      adminID: currentUser?.uid,
      adminName: currentUser?.displayName,
      user: [
        {
          id: currentUser?.uid,
          name: currentUser?.displayName,
          email: currentUser?.email,
        },
      ],
    })
      .then(() => {
        setgrp("");
        setCreate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // create new groups

  if (path && isUser)
    return (
      <div
        className={`flex flex-col gap-2 overflow-hidden h-full p-0 transition-all z-[100]  ${
          !create ? "w-20" : "w-[25ch] shadow-lg shadow-white"
        } md:w-[45ch] `}
      >
        {/* create new group */}
        <div
          className={`card grid gap-3 w-4/5 mx-auto my-2 bg-owner_bg/50 text-white p-2 rounded-lg ${
            create ? "h-40 pb-5" : "h-14 "
          } transition-all duration-500 text-sm`}
        >
          <button
            className=" w-fit rounded-full text-xs font-bold tracking-widest mx-auto scale-[2] my-3"
            onClick={handleCreate}
          >
            {create ? <MdClose /> : <MdMenu />}
          </button>
          <form
            className={`w-full grid grid-cols-1 gap-1 
          transition-all duration-300 ${
            create
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-10"
          }`}
            onSubmit={createGroup}
          >
            <input
              type="text"
              required
              placeholder="Your Team"
              className="outline-none border-2 border-stone-700 rounded-md text-gray-900 px-2 py-1"
              maxLength={20}
              value={grp}
              title={"Group Name Must be below 20 alphabate"}
              onChange={(e) => {
                setgrp(e.target.value);
              }}
            />
            <button className="font-sans font-semibold flex gap-1 items-center bg-slate-800 rounded-full py-2 px-4 w-fit mx-auto ring ring-owner_bg/60 mt-5 hover:ring-owner_bg transition-all duration-300">
              Create <BiMessageRoundedAdd />
            </button>
          </form>
        </div>

        {currentUser && <UserContext create={create} />}
      </div>
    );
}

export default LeftSidbar;

{
  // add selected user to your group
  async function addUsertoGrp() {
    if (selectedUser?.length >= 1) {
      const db = doc(grpRef, id);
      await updateDoc(db, { user: arrayUnion(...selectedUser) }).then(() => {
        alert("Adding Members Successful");
        setshowUser(false);
      });
    } else alert("please select at least 2 User to Add into the group");
  }
}
