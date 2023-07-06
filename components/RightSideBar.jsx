import React, { useState } from "react";
import { auth, db } from "../fbConf";
import { BiPlus } from "react-icons/bi";
import {
  doc,
  deleteDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
function RightSideBar({ showMe, children }) {
  const user = auth.currentUser;
  const router = useRouter();
  const [showUsers, setShowUsers] = useState(false);
  // will delete the group by the admin
  const deleteGroup = async () => {
    const grpDoc = doc(db, `/groups/${children.uid}`);
    await deleteDoc(grpDoc).then(() => {
      alert("Deletion successful");
      router.push("/chat");
    });
  };
  const [users, setUsers] = useState([]);
  //call users
  const getUsers = async () => {
    const q = query(collection(db, "users"));
    const querySnap = await getDocs(q);
    setUsers(querySnap.forEach((doc) => ({ id: doc.id, ...doc })));
    console.log(users);
  };
  const Users = () => {
    return (
      <div>
        {/* {users?.map((user) => (
          <div key={user.id}>
            <div className="user">
              <img src={user.image} alt={user.name} />
              <p>{user.name}</p>
            </div>
          </div>
        ))} */}
      </div>
    );
  };
  // add member fucntions

  // add selected user to your group
  async function addUsertoGrp() {
    if (selectedUser?.length >= 1) {
      const db = doc(grpRef, id);
      await updateDoc(db, { user: arrayUnion(...selectedUser) }).then(() => {
        alert("Adding Members Successful");
        setShowUsers(false);
      });
    } else alert("please select at least 2 User to Add into the group");
  }

  if (showMe)
    return (
      <div
        className="h-full w-[20ch] md:w-[40ch] border-l border-gray-400 text-white
      p-2
      "
        key={children?.uid}
      >
        <section>
          <h2 className="my-3 mx-auto p-2 text-lg text-center text-owner_bg font-bold">
            {children?.name}
          </h2>
          <div
            className="p-5 bg-black w-24 h-24 rounded-full mx-auto flex
          items-center justify-center hover:bg-black/40 "
            title="add group photo"
          >
            <label htmlFor="file">
              <BiPlus enableBackground={true} color={"white"} size={"30px"} />
            </label>
            <input className="hidden" type="file" name="file" id="file" />
          </div>
        </section>
        <section className="w-full my-2 p-3 flex">
          <button
            className="w-fit p-3 mx-auto bg-slate-700 hover:bg-slate-900 rounded-md transition-colors"
            onClick={() => {
              getUsers();
              setShowUsers(true);
            }}
          >
            Add member +
          </button>

          {user.email == children?.creatorEmail && (
            <button
              className="w-fit p-3 mx-auto bg-rose-500 rounded-md transition-colors hover:bg-rose-700"
              onClick={() => {
                if (user.email == children?.creatorEmail) {
                  deleteGroup();
                } else {
                  alert("You are not the creator of this group");
                }
              }}
            >
              Delete
            </button>
          )}
        </section>
        {<Users />}
        <section className="m-auto grid gap-1 ring-2 ring-blue-700 p-3 rounded-md shadow-md shadow-slate-900">
          <h2 className="text-center text-blue-700 font-extrabold mb-3 text-xl">
            Admin Info
          </h2>
          <p className="bg-slate-800/70 rounded-md mx-auto w-full p-2 text-sm">
            Name: {children?.creator}
          </p>
          <p className="bg-slate-800/70 rounded-md mx-auto w-full p-2 text-sm">
            Email: {children?.creatorEmail}
          </p>
        </section>
      </div>
    );
}

export default RightSideBar;

// children has obj:{uid, name}
