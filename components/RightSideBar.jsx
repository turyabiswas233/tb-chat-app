import React from "react";
import { BiPlus } from "react-icons/bi";
function RightSideBar({ showMe, children }) {
  if (showMe)
    return (
      <div className="h-full w-[20ch] md:w-[40ch] border-l border-gray-400 ">
        <section>
          <h2 className="my-3 mx-auto p-2 text-lg text-center text-owner_bg font-bold">
            {children.name}
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
        <section className="w-full grid my-2 p-3">
          <button className="w-fit p-3 mx-auto bg-slate-900 rounded-md">
            Add member +
          </button>
        </section>
      </div>
    );
}

export default RightSideBar;

// children has obj:{uid, name}
