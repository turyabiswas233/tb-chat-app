import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../fbConf";
import Image from "next/image";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdPersonAdd, MdRemoveCircle } from "react-icons/md";

function Sidbar() {
  const user = auth.currentUser;
  const route = useRouter();
  const { id } = route.query;
  const [rend, setrend] = useState(true);
  const [chatlist, setlist] = useState([]);
  const [create, setCreate] = useState(false);
  const [showuser, setshowUser] = useState(false);
  const [us, setus] = useState([]);
  const grpRef = collection(db, "groups");
  const [snap, load, error] = useCollection(grpRef);
  const groups = snap?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // create new groups
  function handleCreate() {
    setCreate(!create);
  }
  const show = [{ transform: "scale(0)" }, { transform: "scale(1)" }];

  const timing = {
    duration: 300,
    iterations: 1,
  };
  const smoothPresent = useRef();

  useEffect(() => {
    smoothPresent.current?.animate(show, timing);
  }, [create]);

  const [grp, setgrp] = useState("");
  function handleShowHide() {
    setshowUser(!showuser);
    if (!showuser) {
      setgrp("");
    }
  }

  // add new group to db
  async function createGroup(e) {
    e?.preventDefault();
    const wrds = grp
      ?.split(" ")
      ?.map((word) => {
        return word[0]?.toUpperCase() + word?.substring(1);
      })
      .join(" ");
    await addDoc(grpRef, {
      grpname: wrds,
      admin: user?.email,
      adminName: user?.displayName,
      user: [
        {
          id: user?.uid,
          name: user?.displayName,
          email: user?.email,
        },
      ],
    })
      .then(() => {
        setgrp("");
        setrend(true);
        setCreate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // delete grp
  function deleteGrp(id) {
    const docRef = doc(grpRef, id);
    deleteDoc(docRef)
      .then(() => {
        route.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // fetch all users
  async function getusers() {
    const users = collection(db, "users");

    const data = await getDocs(users);
    setus(
      data?.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          if (a.name < b.name) return -1;
        })
    );
  }
  useEffect(() => {
    getusers().catch((e) => {
      console.log(e);
    });
  }, [id]);
  const selectedUser = [];
  const EachUser = ({ id, image, name, email }) => {
    return (
      <p
        key={id}
        className="flex items-center gap-2 my-1 text-white hover:bg-slate-600 rounded-md p-2 cursor-default 
        
        "
      >
        <input
          type="checkbox"
          key={id}
          onChange={(e) => {
            if (e.target.checked.valueOf() == true) {
              let x = {
                id: id,
                name: name,
                email: email,
              };
              selectedUser.push(x);
            }
          }}
        />
        {image && (
          <Image src={image} height={25} width={25} className="rounded-full" />
        )}
        {name}
      </p>
    );
  };

  // add selected user to your group
  async function addUsertoGrp() {
    if (selectedUser?.length > 1) {
      const db = doc(grpRef, id);
      await updateDoc(db, { user: arrayUnion(...selectedUser) }).then(() => {
        alert("Adding Members Successful");
        setshowUser(false);
      });
    } else alert("please select at least 2 User to Add into the group");
  }
  return (
    <div className="flex flex-col items-center overflow-hidden h-full dark:bg-zinc-900 bg-zinc-300 p-2 rounded-md min-w-max w-2/5 ">
      <button
        className="dark:bg-slate-800 bg-slate-400 w-fit p-3 rounded-full text-xs font-bold tracking-widest"
        onClick={handleCreate}
      >
        Create Group
      </button>

      <div
        ref={smoothPresent}
        className={`card w-full ${
          create && "bg-stone-600 text-white  mt-2 p-2 shadow-md shadow-white"
        }  rounded-sm  text-sm transition-colors`}
      >
        {create && (
          <form
            className="w-full grid grid-cols-1 gap-1"
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
            <button className="font-sans font-semibold bg-slate-800 rounded-full py-2 px-4 w-fit mx-auto">
              Create
            </button>
          </form>
        )}
      </div>

      <span className="dark:bg-stone-100 bg-stone-700 w-5/6 h-[2px] rouded-full my-3 container"></span>

      {showuser && (
        <div
          className="absolute top-20 md:top-14 md:w-max w-2/3 h-4/5 left-10 z-50  p-2 overflow-hidden grid
        rounded-lg shadow-inner shadow-white backdrop-blur-md
        "
        >
          <h2 className="text-slate-300 text-xs text-center w-3/4 md:w-2/3 h-fit mx-auto my-3  ">
            <span className="font-bold text-red-500 contrast-125">
              Cautious:{" "}
            </span>
            If you unfortunately select someone whom you don't want to add to
            your group, then click on{" "}
            <span className="font-bold text-red-500 contrast-125">cancel</span>{" "}
            button and start selecting from first.
          </h2>
          {/* button */}
          <div className="w-2/3 h-fit mb-2 mx-auto grid-cols-2 grid text-sm">
            <button
              className="mx-auto w-20 h-10 text-center bg-green-800 text-white p-1 rounded-md hover:bg-green-600"
              onClick={addUsertoGrp}
            >
              Add+
            </button>
            <button
              className="mx-auto w-20 h-10 text-center bg-red-800 text-white p-1 rounded-md hover:bg-red-600"
              onClick={handleShowHide}
            >
              Cancel
            </button>
          </div>
          <hr className="mt-2 w-2/3 mx-auto" />
          <div className="p-1 w-full h-full grid overflow-y-scroll sidbox">
            {us?.map((ele) => {
              if (ele?.email !== user?.email)
                return (
                  <EachUser
                    key={ele?.id}
                    id={ele?.id}
                    name={ele?.name}
                    email={ele?.email}
                    image={ele?.image}
                  />
                );
            })}
          </div>
        </div>
      )}

      <ul
        className="w-full h-full overflow-y-auto sidbox text-white 
      "
      >
        {load && (
          <>
            <div
              className="relative h-full flex
        justify-center items-center
        "
            >
              <p className="md:text-2xl text-lg w-2/3 capitalize text-center text-zinc-700 break-words">
                Loading...
              </p>
            </div>
          </>
        )}
        {groups?.length != 0 ? (
          groups?.map((ele) => {
            return (
              <li
                key={ele?.id}
                className={` flex justify-between items-center 
              cursor-pointer 
              my-1 py-1 h-fit w-full
              rounded-sm gap-1
              ${
                id == ele?.id && ele?.admin == user?.email ? "grp_list" : ""
              } relative 
          `}
              >
                <span className="absolute left-1">
                  <MdPersonAdd
                    className="hover:text-green-400 text-black dark:text-white transition-colors md:scale-125"
                    title="Add New Members to the Group"
                    onClick={handleShowHide}
                  />
                </span>
                <p
                  className={`text-xs md:text-sm tracking-tight p-2
              rounded-sm hover:bg-zinc-500 hover:text-zinc-200 w-full
            h-fit relative transition-all grp_name ${
              id == ele?.id ? "bg-zinc-500 " : "bg-zinc-800 "
            }`}
                  onClick={() => {
                    route.push(`/chat/${ele?.id}`);
                  }}
                >
                  {ele?.grpname}
                </p>
                <span className="absolute right-1">
                  <MdRemoveCircle
                    className="hover:text-red-400 transition-colors md:scale-125 text-black dark:text-white"
                    title="Delete Group"
                    onClick={() => {
                      deleteGrp(ele?.id);
                    }}
                  />
                </span>
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
      </ul>
    </div>
  );
}

export default Sidbar;
