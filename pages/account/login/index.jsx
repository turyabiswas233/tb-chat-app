import { auth, db } from "../../../fbConf";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { AuthContext } from "../../../components/context/AuthContext";
import { useContext, useState } from "react";
//icons
import { MdEmail, MdLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CgLogIn } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

function Login() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [userCred, setUserCred] = useState({
    email: "",
    pass: "",
  });
  const [error, seterror] = useState({
    err1: "",
    err2: "",
    type: "",
  });
  const [showPass, setshowPass] = useState(false);
  function uploadUserInfo(us) {
    const user = us;
    setDoc(doc(db, "users", user?.uid), {
      email: user?.email,
      name: user?.displayName,
      image: user?.photoURL,
    })
      .then(() => {
        router.push("/");
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
  function empassSignIn(e) {
    e?.preventDefault();
    if (showPass) {
      alert("please hide your password before login");
      return;
    } else if (userCred.email == "" || userCred.pass == "") {
      seterror((pre) => {
        return { ...pre, type: "empty" };
      });
      if (userCred.email == "") {
        seterror((pre) => {
          return { ...pre, err1: "enter your email" };
        });
      }
      if (userCred.pass == "") {
        seterror((pre) => {
          return { ...pre, err2: "enter your password" };
        });
      }
    } else {
      signInWithEmailAndPassword(auth, userCred.email, userCred.pass)
        .then((e) => {
          uploadUserInfo(e.user);
        })
        .catch((err) => {
          console.log("error to login");
          seterror({
            err1: "Failed to login",
            err2: "Please check your email or password",
          });
        });
    }
  }

  function togglePass() {
    setshowPass(!showPass);
  }
  if (!currentUser)
    return (
      <div className="h-[calc(100%_-_50px)] md:bg-gradient-to-tr from-sky-700 to-activeTab/40 md:bg-opacity-10 w-full flex flex-col md:flex-row relative justify-center py-10 max-w-5xl m-auto rounded-xl">
        <section className="text-center w-fit mx-auto my-auto">
          <h3 className="text-3xl md:text-4xl font-bold tracking-wider">
            Sign in to <span className="text-activeRing">Trustenger</span>
          </h3>
        </section>

        <div className="h-full m-auto flex flex-col justify-center w-auto mx-auto flex-2">
          <section className="grid">
            <form
              className="grid grid-cols-1 md:my-10
              bg-activeTab/10 p-7 mt-2 rounded-lg"
              onSubmit={empassSignIn}
            >
              <section
                className={`bg-black text-white rounded-full p-4 ring-2 ${
                  userCred.email == "" && error.type !== "empty"
                    ? "ring-0"
                    : userCred.email.includes("@")
                    ? "ring-cyan-500"
                    : "ring-rose-500"
                } shadow-[0_0_15px_-10px] my-2 shadow-rose-100 flex gap-2 transition-all items-center border border-msg_txt/50 relative`}
              >
                <label htmlFor="email">
                  <MdEmail color="#a2affc" />
                </label>
                <input
                  className={`text-white bg-transparent placeholder:text-cyan-100 placeholder:opacity-50 focus:outline-none `}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your email"
                  value={userCred.email}
                  onChange={(e) => {
                    seterror({
                      err1: "",
                      err2: "",
                    });
                    setUserCred((pre) => {
                      return { ...pre, email: e.target.value };
                    });
                  }}
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
                <input
                  className={`text-white bg-transparent placeholder:text-cyan-100 placeholder:opacity-50 focus:outline-none `}
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="password"
                  value={userCred.pass}
                  minLength={8}
                  onChange={(e) => {
                    seterror({
                      err1: "",
                      err2: "",
                    });
                    setUserCred((pre) => {
                      return { ...pre, pass: e.target.value };
                    });
                  }}
                />
                <span onClick={togglePass} type="reset">
                  {!showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </section>
              {error.err1 !== "" &&
                error.err2 !== "" &&
                error.type !== "empty" && (
                  <h2
                    className={` 
                grid text-red-600 text-xs px-4
                `}
                  >
                    <span>{error.err1}</span>
                    <span>{error.err2}</span>
                  </h2>
                )}
              <button
                className=" font-bold rounded-full my-2 p-3 px-5 text-sm  bg-activeTab hover:bg-activeRing  transition-all text-black
               w-fit mx-auto flex gap-1 items-center"
                type="submit"
              >
                Login <CgLogIn />
              </button>
            </form>
            <p
              className="relative after:absolute after:h-px after:w-2/5 after:bg-activeTab after:right-0 after:top-1/2
            before:absolute before:h-px before:w-2/5 before:bg-activeTab before:top-1/2 flex py-4"
            >
              <span className="mx-auto w-fit">Or</span>
            </p>
            <button
              className=" font-bold tracking-wider rounded-full p-3 text-sm bg-slate-100/80 hover:bg-amber-50 text-friend_bg  hover:shadow-sm transition-all flex gap-2 items-center justify-center capitalize"
              onClick={googleSignIn}
            >
              sign in with Google <FcGoogle />
            </button>
          </section>
          <div>
            <h2 className="mx-auto w-fit text-xs my-1">
              Don't have account?{" "}
              <Link href={"/account/signup"}>
                <span className="capitalize hover:underline text-white/60 hover:text-blue-400 cursor-pointer">
                  Sign up
                </span>
              </Link>
            </h2>
          </div>
        </div>
      </div>
    );
}

export default Login;
