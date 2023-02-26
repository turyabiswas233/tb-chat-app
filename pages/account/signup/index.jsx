import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdFace, MdLock, MdPhoto } from "react-icons/md";
import Input from "../../../components/Input";
import { auth, db } from "../../../fbConf";
import Loading from "../../../components/loading/loading";
import { doc, setDoc } from "firebase/firestore";

function Signup({ theme }) {
  const [showPass, setshowPass] = useState(false);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [userCred, setUserCred] = useState({
    email: "",
    pass: "",
    pw1: "",
    pw2: "",
    name: "",
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
    setUserCred((pre) => ({ ...pre, pass: event }));
  }
  function pw1(event) {
    setUserCred((pre) => ({ ...pre, pw1: event.target.value }));
  }
  function pw2(event) {
    setUserCred((pre) => ({ ...pre, pw2: event.target.value }));
  }
  function name(event) {
    setUserCred((pre) => ({ ...pre, name: event.target.value }));
  }
  const spsym = specialSym(userCred.pw1);
  const cappass = capitalChar(userCred.pw1);
  const smpass = smallChar(userCred.pw1);
  const numpass = number(userCred.pw1);
  const passStr =
    spsym && cappass && smpass && numpass && userCred.pw1.length > 7;
  const [confirmPassword, setConfirmPassword] = useState(false);
  useEffect(() => {
    setConfirmPassword(userCred.pw1 == userCred.pw2 && userCred.pw1.length > 7);
    if (confirmPassword) {
      pass(userCred.pw1);
    }
  }, [userCred.pw1, userCred.pw2]);
  return (
    <div
      className="h-fit m-auto grid justify-center md:grid-cols-2 
    p-3 rounded-lg max-w-screen-lg
    "
    >
      <section className="text-center w-fit mx-auto md:my-auto mb-4">
        <h3 className="text-3xl md:text-4xl font-bold tracking-wider ">
          Create new account in{" "}
          <span className="text-activeRing">Trustenger</span>
        </h3>
      </section>
      <section className="grid max-w-md mx-auto">
        <form
          className={`grid grid-cols-1 md:my-10
              ${
                !theme ? "bg-inactivetxt/30" : "bg-inactivetxt"
              } p-7 mt-2 rounded-lg`}
          onSubmit={(e) => {
            e.preventDefault();
            if (
              userCred.name == "" ||
              userCred.email == "" ||
              userCred.pass == "" ||
              !confirmPassword
            ) {
              seterror((pre) => ({ ...pre, type: "empty" }));
            } else {
              empassSignIn();
            }
          }}
        >
          <section
            className={`bg-black/50 text-white rounded-md p-4 ring-2 ${
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
            className={`bg-black/50 text-white rounded-md p-4 ring-2 ${
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
          {/* new password */}
          <section
            className={`bg-black/50 text-white rounded-md p-4 ring-2 ${
              userCred.pw1 == "" && error.type !== "empty"
                ? "ring-0"
                : passStr
                ? "ring-cyan-500"
                : "ring-rose-500"
            } shadow-[0_0_15px_-10px] my-2 shadow-rose-100 flex gap-2 transition-all items-center border border-msg_txt/50 relative`}
          >
            <label htmlFor="password">
              <MdLock color="#a2affc" />
            </label>
            <Input
              type={"password"}
              placeholder={"new password"}
              showPass={showPass}
              getValue={pw1}
              require={true}
            />
            <span onClick={togglePass} type="reset">
              {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </section>
          {/* confirm password */}
          <section
            className={`bg-black/50 text-white rounded-md p-4 ring-2 ${
              userCred.pw2 == "" && error.type !== "empty"
                ? "ring-0"
                : confirmPassword && passStr
                ? "ring-cyan-500"
                : "ring-rose-500"
            } shadow-[0_0_15px_-10px] my-2 shadow-rose-100 flex gap-2 transition-all items-center border border-msg_txt/50 relative`}
          >
            <label htmlFor="password">
              <MdLock color="#a2affc" />
            </label>
            <Input
              type={"password"}
              placeholder={"confirm password"}
              showPass={showPass}
              getValue={pw2}
              require={true}
            />
            <span onClick={togglePass} type="reset">
              {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
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
            className={`font-bold rounded-full mt-4 py-3 px-5 text-sm  bg-activeTab hover:bg-activeRing  transition-all text-black
               w-fit mx-auto flex gap-1 items-center
               disabled:bg-slate-600 disabled:text-opacity-60
               `}
            type="submit"
            disabled={
              load || !userCred.email || !userCred.name || !userCred.pass
            }
          >
            {load ? <Loading w={10} h={10} color={"#23e2ff"} /> : "sign up"}
          </button>
        </form>
        <div className="text-xs font-bold capitalize">
          <span className="text-green-700 underline underline-offset-2 ">
            password hint:
          </span>
          <ul className={`list-disc px-5`}>
            <li
              className={`${
                cappass && smpass ? "text-green-600" : "text-rose-600"
              }`}
            >
              {" "}
              use characters: [A-Z] and [a-z]
            </li>
            <li className={`${spsym ? "text-green-600" : "text-rose-600"}`}>
              {" "}
              use special characters: {"!@#$%^&*)("}
            </li>
            <li className={`${numpass ? "text-green-600" : "text-rose-600"}`}>
              {" "}
              use numbers: 0 to 9
            </li>
            <li
              className={`${
                userCred.pw1.length >= 8 ? "text-green-600" : "text-rose-600"
              }`}
            >
              must be greater than or equal to 8 character
            </li>
            <li
              className={`${
                confirmPassword ? "text-green-600" : "text-rose-600"
              }`}
            >
              match password
            </li>
          </ul>
        </div>

        {/* or create account using gmail */}
        <p
          className="relative after:absolute after:h-px after:w-2/5 after:bg-activeTab after:right-0 after:top-1/2
            before:absolute before:h-px before:w-2/5 before:bg-activeTab before:top-1/2 flex py-4"
        >
          <span className="mx-auto w-fit">Or</span>
        </p>
        <button
          className={`font-bold tracking-wider rounded-full p-3 text-sm transition-all flex gap-2 items-center justify-center capitalize shadow-sm shadow-slate-700 hover:brightness-105 ${
            theme ? "bg-zinc-100" : "bg-zinc-800 "
          }`}
          onClick={googleSignIn}
        >
          sign up with Google <FcGoogle />
        </button>
      </section>
    </div>
  );
}
function specialSym(str) {
  return str.match(/[`~!@#$%^&*()]/);
}
function capitalChar(str) {
  return str.match(/[A-Z]/);
}
function smallChar(str) {
  return str.match(/[a-z]/);
}
function number(str) {
  return str.match(/[0-9]/);
}
export default Signup;
