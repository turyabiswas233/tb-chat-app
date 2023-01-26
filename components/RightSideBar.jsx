import React from "react";

function RightSideBar({ showMe, children }) {
  if (showMe)
    return (
      <div className="h-full w-[20ch] md:w-[40ch] border-l border-gray-400">
        <section>
          <h2 className="title">Private chat</h2>
        </section>
      </div>
    );
}

export default RightSideBar;
