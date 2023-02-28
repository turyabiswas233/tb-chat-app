import React, { useState } from "react";
import { useRouter } from "next/router";
// import react-icons
import {AiOutlineCloseCircle} from 'react-icons/ai'

function PopupLogin({ show }) {
  const router = useRouter();
  const id = router.pathname;
  let isinaccount = id.includes("account");
  const [hardHide,setHardHide] = useState(false)
  function handleHardHide () {
    setHardHide(true);
  }

  const Button = ({ child, route }) => {
    return (
      <button
        className="bg-white rounded-full p-2 px-4 hover:bg-black hover:text-red-50 text-black capitalize focus:outline-none
      focus:bg-black focus:text-red-50 hover:font-semibold h-fit
      "
        onClick={() => router.push(`${route}`)}
      >
        {child}
      </button>
    );
  };
  if (!isinaccount && !hardHide)
    return (
      <div
        className={`bg-owner_bg w-full p-2 flex flex-col md:flex-row text-white h-40 relative items-center justify-evenly ${
      show ? "opacity-100" : "opacity-0 "
    } transition-opacity duration-500`}
      >
        <div>
          <h1 className="md:text-3xl text-xl">Missing something?</h1>
          <p className="md:text-lg text-sm">
            All the members who are connected here, can have full access on all
            the contens.
          </p>
        </div>
        <div className="flex gap-2 text-sm md:text-md">
          <Button child={"Sign up"} route={"/account/signup"} />
          <Button child={"Login"} route={"/account/login"} />
        </div>
        <span className="absolute right-5 top-5 hover:text-green-500 text-lg transition-colors " onClick={handleHardHide}>
          <AiOutlineCloseCircle enableBackground={true} />
        </span>
      </div>
    );
}

export default PopupLogin;
