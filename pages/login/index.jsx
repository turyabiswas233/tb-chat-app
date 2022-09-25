import { auth, db } from "../../fbConf";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function Login() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const user = auth.currentUser;
  const [us, setus] = useState();
  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((us) => {
        const user = us?.user;
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
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error?.code;
        const errorMessage = error?.message;

        console.log(errorCode, errorMessage);
      });
  }

  useEffect(() => {
    if (user) {
      setus(user);
    }
  }, []);
  if (!us)
    return (
      <div
        className="h-screen w-full py-10 md:px-20 
      grid md:grid-cols-2 md:gap-5 relative justify-center items-center dark:text-gray-100
    "
      >
        <section className="h-fit text-center ">
          <h3 className="text-3xl md:text-4xl font-bold tracking-wider ">
            Login Now
          </h3>
        </section>

        {/* divider */}
        <span
          className="w-[3pt] h-1/2 p-1 absolute top-1/4 left-1/2 md:block hidden light:bg-black bg-amber-100 rounded-[100%]
        "
        ></span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="h-full grid justify-center items-center"
        >
          <section className="h-fit w-fit">
            <button
              type="submit"
              className=" font-bold tracking-wider rounded-md  p-3 text-xl md:text-2xl
            dark:bg-slate-600 bg-slate-400 
            shadow-md hover:shadow-sm transition-all
            shadow-slate-600 dark:shadow-slate-200
            "
            >
              Login with Google
            </button>
          </section>
        </form>
      </div>
    );
  else if (us) {
    router.push("/chat");
  }
}

export default Login;
