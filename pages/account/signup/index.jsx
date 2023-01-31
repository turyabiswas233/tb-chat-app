import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdFace, MdLock, MdPhoto } from "react-icons/md";
import Input from "../../../components/Input";
import { auth, db } from "../../../fbConf";
import Loading from "../../../components/loading/loading";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [showPass, setshowPass] = useState(false);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [userCred, setUserCred] = useState({
    email: "",
    pass: "",
    name: "",
    photo: null,
  });
  const [error, seterror] = useState({
    err1: "",
    err2: "",
    type: "",
  });

  const [load, setload] = useState(false);

  function togglePass() {
    setshowPass(!showPass);
  }
  function uploadUserInfo(us) {
    const user = us;
    setDoc(doc(db, "users", user?.uid), {
      email: user?.email,
      name: user?.displayName,
      image: user?.photoURL,
    })
      .then(() => {
        router.push("/chat/");
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }
  function googleSignIn() {
    signInWithPopup(auth, provider)
      .then((us) => {
        uploadUserInfo(us?.user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error?.code;
        const errorMessage = error?.message;

        console.log(errorCode, errorMessage);
      });
  }
  async function empassSignIn() {
    let user;

    await createUserWithEmailAndPassword(auth, userCred.email, userCred.pass)
      .then((us) => {
        setload(true);
        user = us.user;

        updateProfile(user, {
          displayName: userCred?.name,
        }).then(() => {
          user = auth.currentUser;
          setDoc(doc(db, "users", user?.uid), {
            email: user?.email,
            name: user?.displayName,
          })
            .then(() => {
              router.push("/chat/");
              setload(false);
            })
            .catch((err) => {
              setload(false);
              if (auth.currentUser) {
                deleteUser(auth.currentUser);
              }
              console.log(err?.message);
            });
        });
      })
      .catch((err) => {
        seterror((pre) => ({
          ...pre,
          err1: "Failed to create your profile",
          type: "userNotCreated",
        }));
        if (auth.currentUser) {
          deleteUser(auth.currentUser);
        }
        setload(false);
      });
  }

  function email(event) {
    setUserCred((pre) => ({ ...pre, email: event.target.value }));
  }
  function pass(event) {
    setUserCred((pre) => ({ ...pre, pass: event.target.value }));
  }
  function name(event) {
    setUserCred((pre) => ({ ...pre, name: event.target.value }));
  }
  function photo(event) {
    setUserCred((pre) => ({ ...pre, photo: event.target.files[0] }));
  }

  return (
    <div className="h-fit m-auto grid justify-center">
      <section className="grid">
        <form
          className="grid grid-cols-1 md:my-10
              bg-activeTab/10 p-7 mt-2 rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              userCred.name == "" ||
              userCred.email == "" ||
              userCred.pass == ""
            ) {
              seterror((pre) => ({ ...pre, type: "empty" }));
            } else {
              empassSignIn();
            }
          }}
        >
          <section
            className={`bg-black text-white rounded-full p-4 ring-2 ${
              error.type !== "empty" && userCred.name == ""
                ? "ring-0"
                : error.type == "empty"
                ? " ring-rose-500"
                : " ring-cyan-500"
            } shadow-[0_0_15px_-10px] my-2 shadow-rose-100 flex gap-2 transition-all items-center border border-msg_txt/50 relative`}
          >
            <label htmlFor="name">
              <MdFace color="#a2affc" />
            </label>
            <Input type={"text"} placeholder={"Name"} getValue={name} />
          </section>
          <section
            className={`bg-black text-white rounded-full p-4 ring-2 ${
              error.type !== "empty" && userCred.email == ""
                ? "ring-0"
                : error.type == "empty" || !userCred.email?.includes("@")
                ? " ring-rose-500"
                : " ring-cyan-500"
            } shadow-[0_0_15px_-10px] my-2 shadow-rose-100 flex gap-2 transition-all items-center border border-msg_txt/50 relative`}
          >
            <label htmlFor="email">
              <MdEmail color="#a2affc" />
            </label>
            <Input
              getValue={email}
              placeholder={"Email"}
              require={true}
              type={"email"}
            />
          </section>
          <section
            className={`bg-black text-white rounded-full p-4 ring-2 ${
              userCred.pass == "" && error.type !== "empty"
                ? "ring-0"
                : userCred.pass.length > 7
                ? "ring-cyan-500"
                : "ring-rose-500"
            } shadow-[0_0_15px_-10px] my-2 shadow-rose-100 flex gap-2 transition-all items-center border border-msg_txt/50 relative`}
          >
            <label htmlFor="password">
              <MdLock color="#a2affc" />
            </label>
            <Input
              type={"password"}
              placeholder={"password"}
              showPass={showPass}
              getValue={pass}
              require={true}
            />
            <span onClick={togglePass} type="reset">
              {!showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </section>

          {error.type !== "userNotCreated" && (
            <h2
              className={` 
                grid text-red-600 text-xs px-4
                `}
            >
              <span>{error.err1}</span>
            </h2>
          )}
          <button
            className=" font-bold rounded-full mt-4 py-3 px-5 text-sm  bg-activeTab hover:bg-activeRing  transition-all text-black
               w-fit mx-auto flex gap-1 items-center"
            type="submit"
            disabled={load}
          >
            {load ? <Loading w={10} h={10} /> : "sign up"}
          </button>
        </form>
        <p
          className="relative after:absolute after:h-px after:w-1/3 after:bg-activeTab after:right-0 after:top-1/2
            before:absolute before:h-px before:w-1/3 before:bg-activeTab before:top-1/2 flex py-4"
        >
          <span className="mx-auto w-fit">Or</span>
        </p>
        <button
          className=" font-bold tracking-wider rounded-full p-3 text-sm bg-slate-100/80 hover:bg-amber-50 text-friend_bg  hover:shadow-sm transition-all flex gap-2 items-center justify-center capitalize"
          onClick={googleSignIn}
        >
          sign up with Google <FcGoogle />
        </button>
      </section>
    </div>
  );
}

export default Signup;
