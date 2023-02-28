import React, { useEffect, useState } from "react";

const CookieConfirm = ({ theme }) => {
  const [mount, setmount] = useState(false);
  const [show, setshow] = useState(false);

  useEffect(() => {
    const setCookie = (cname, cvalue, exdays) => {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=/`;
    };

    const getCookie = (cname) => {
      const name = `${cname}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };

    if (!getCookie("cookieConfirm")) {
      setmount(true);
      setCookie("cookieConfirm", true, 365);
    }
  }, []);
  useEffect(() => {
    const loop = setTimeout(() => {
      setshow(true);
      return clearTimeout(loop);
    }, 4000);
  }, []);

  if (mount)
    return (
      <div
        className={`w-[340px] bg-cyan-700 text-slate-200 rounded-lg p-4 space-y-4  font-bold fixed bottom-5 left-0 transition-all z-50 mx-auto scale-75 ${
          show ? "opacity-100" : "opacity-0 bottom-0"
        }`}
      >
        <p>
          This website uses cookies to ensure you get the best experience on our
          website.
        </p>
        <button
          className="bg-cyan-200 rounded-md text-center px-3 py-2 text-zinc-600 focus:bg-owner_bg cursor-pointer"
          onClick={() => setshow(false)}
        >
          Ok
        </button>
      </div>
    );
};

export default CookieConfirm;
