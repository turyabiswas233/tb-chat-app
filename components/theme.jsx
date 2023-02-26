import React, { useEffect, useState } from "react";
const THEME_KEY = "theme";
function useToggleTheme() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const storageTheme = JSON.parse(localStorage.getItem(THEME_KEY));
    if (storageTheme) setTheme(storageTheme);
  }, []);
  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }, [theme]);

  // toggle theme function
  function toggleTheme() {
    setTheme(theme ? false : true);
  }
  return [theme, toggleTheme];
}
function Theme({ dark, changetheme }) {
  function tglThm() {
    return changetheme();
  }

  return (
    <button
      onClick={tglThm}
      className={`rounded-full w-12 h-6 transition-all mx-auto my-0  ${
        dark
          ? "bg-slate-900 after:left-0 after:bg-yellow-300 after:ml-1 "
          : "bg-slate-100 after:left-full after:-translate-x-full after:bg-slate-900 after:-ml-1 "
      }
       flex place-items-center relative after:absolute after:w-5 after:h-5 after:rounded-full after:transition-all after:duration-500 `}
    ></button>
  );
}
export { useToggleTheme };
export default Theme;
