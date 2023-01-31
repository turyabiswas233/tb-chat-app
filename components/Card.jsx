import React, { useReducer, useState } from "react";
import {
  BiLike,
  BiComment,
  BiSend,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { MdReport } from "react-icons/md";
const emojis = {
  like: "👍",
  love: "❤",
  laugh: "😂",
  sad: "😥",
  think: "🤔",
  hate: "😡",
};
const emojiArr = [
  { emoji: emojis.like, title: "Like" },
  { emoji: emojis.love, title: "Love" },
  { emoji: emojis.laugh, title: "Laught" },
  { emoji: emojis.sad, title: "Sad" },
  { emoji: emojis.think, title: "Think" },
  { emoji: emojis.hate, title: "Angry" },
];
const Menu = () => {
  return (
    <>
      <div
        className="p-2 absolute rounded-md bg-owner_bg/75 w-32 h-fit
         right-0 top-10"
      >
        <ul className="capitalize text-sm">
          <li className="flex items-center gap-1 cursor-pointer hover:bg-primary_bg_dark p-1 rounded-md">
            <MdReport /> report
          </li>
        </ul>
      </div>
    </>
  );
};
export default function Card({
  authorName,
  authorPhoto,
  blog,
  likes,
  uid,
  bright,
}) {
  const [shComment, setshComment] = useState(false);
  const [menu, setMenu] = useState(false);
  const [like, setLike] = useState(false);

  function toggleCmnt() {
    setshComment(!shComment);
  }
  function toggleMenu() {
    setMenu(!menu);
  }
  function toggleLike() {
    setLike(!like);
  }
  return (
    <div
      className="rounded-lg p-4 transition-all ring-2 my-4"
      style={{
        filter: `brightness(${bright})`,
      }}
    >
      <section className="capitalize flex justify-between ">
        <div
          className="left flex items-center gap-2 w-fit bg-owner_bg/30 p-2 rounded-md"
          title={"author"}
        >
          {/* image */}
          <span className="p-2 w-8 h-8 bg-black rounded-full">
            {authorPhoto}
          </span>
          <h2>
            <span className="text-sm text-cyan-500 font-bold ">
              {/* author */}
              {authorName}
            </span>
          </h2>
        </div>
        <div className="place-self-center relative">
          <button
            className="w-fit h-fit bg-owner_bg/30 p-2 rounded-md hover:brightness-125 transition-all cursor-pointer"
            onClick={toggleMenu}
          >
            <BiDotsHorizontalRounded />
          </button>
          {menu && <Menu />}
        </div>
      </section>
      <hr className="my-4 border-gray-600/40" />
      <section className="space-y-2">
        {/* blog */}
        {blog}
        <br />
        <div className="relative left-1/2 -translate-x-1/2 w-[400px] h-[200px] p-3 bg-rose-600 rounded-md"></div>
      </section>
      {/* actions */}
      <section className="flex items-center gap-3 my-3">
        <button
          className={`flex items-center gap-1 hover:bg-owner_bg hover:text-white p-2 rounded-md transition-colors duration-[400ms] relative ${
            like && "bg-owner_bg/60 text-white"
          }`}
          onClick={toggleLike}
        >
          <BiLike /> Like {likes}
          {/* {state !== null ? state?.emoji : <BiLike />}
          {state !== null ? state?.title : `Like ${likes || ""}`} */}
          {/* {shEmoji && (
            <ul className=" flex  absolute bottom-[calc(100%+5px)] left-1/2 bg-owner_bg/75 rounded-full p-2">
              {emojiArr.map((emoji, id) => {
                return (
                  <li
                    key={id}
                    className={`text-rose-600 mx-1 w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-black/40
                      ${state?.emoji == emoji.emoji && "ring-4 ring-blue-500"}
                      `}
                    onClick={() => {
                      setshemojis(false);
                      dispatch({
                        type: emoji.emoji,
                        payload: {
                          emoji: emoji.emoji,
                          title: emoji.title,
                          id: id,
                        },
                      });
                    }}
                  >
                    {emoji.emoji}
                  </li>
                );
              })}
            </ul>
          )} */}
        </button>

        <button
          className="flex items-center gap-1 hover:bg-slate-900 hover:text-white p-2 rounded-md transition-colors duration-[400ms]"
          onClick={toggleCmnt}
        >
          <BiComment />
          Comment
        </button>
      </section>
      {shComment && (
        <section className="flex items-center gap-3 ring-2 ring-white/50 w-2/3 p-2 rounded-lg ml-auto bg-slate-300/20">
          <input
            className="bg-transparent focus:border-none focus:outline-none  m-1 flex-1"
            type="text"
            name=""
            placeholder="comment..."
            id=""
          />
          <button className="hover:bg-slate-800 bg-slate-900 text-white p-2 rounded-lg transition-colors ">
            <BiSend />
          </button>
        </section>
      )}
    </div>
  );
}
