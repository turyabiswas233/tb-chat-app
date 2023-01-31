import React, { useReducer } from "react";
import { MdClose, MdPostAdd } from "react-icons/md";
const TAGS = {
  WEB: "web development",
  GRAPHICS: "grphics designer",
  HUMAN: "Human resource & development",
};
const tagsArr = new Array(
  { id: 0, tag: TAGS.WEB, select: false },
  { id: 1, tag: TAGS.GRAPHICS, select: false },
  { id: 2, tag: TAGS.HUMAN, select: false }
);

function Post({ togglePost }) {
  const [state, dispatch] = useReducer(reducer, tagsArr);
  function reducer(state, action) {
    switch (action.type) {
      case "toggle":
        return state?.map((e) => {
          if (e?.id === action?.id) {
            return { ...e, select: !e?.select };
          }
          return { ...e };
        });

      default:
        state;
    }
  }
  return (
    <div className="mx-auto w-fit absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-slate-800 z-50 p-5 rounded-lg">
      <span>
        <button onClick={togglePost}>
          <MdClose
            enableBackground={true}
            className="rounded-full bg-owner_bg/50 scale-110 p-px absolute right-3
                top-3 hover:bg-red-400"
          />
        </button>
      </span>
      <section className="mx-auto w-fit">
        <textarea
          className="resize-none bg-transparent p-2 ring-2 rounded-md"
          name="newPost"
          id="newPost"
          cols={"50"}
          rows={"10"}
          placeholder="Create a new post..."
        ></textarea>
        {/* tags */}
      </section>
      <section className="flex gap-2.5">
        <span>Tags: </span>{" "}
        <ul className="flex items-center gap-2 text-xs">
          {state
            ?.filter((val) => {
              return !val?.select;
            })
            ?.map((tag) => {
              return (
                <li
                  key={tag?.id}
                  className={`w-fit bg-slate-700/70 rounded-full px-3 hover:brightness-110 cursor-pointer capitalize`}
                  onClick={() => {
                    dispatch({ type: "toggle", id: tag?.id });
                  }}
                >
                  {tag.tag}
                </li>
              );
            })}
        </ul>
      </section>
      <section className="flex gap-2 text-xs">
        {state
          ?.filter((val) => {
            return val?.select;
          })
          ?.map((tag) => {
            return (
              <p
                className="bg-slate-500 rounded-full w-fit px-2 cursor-pointer"
                onClick={() => {
                  dispatch({ type: "toggle", id: tag?.id });
                }}
              >
                #{tag.tag}
              </p>
            );
          })}
      </section>
      {/* Post */}
      <button className="bg-blue-700 rounded-full flex items-center px-4 py-2 ml-auto mt-4 hover:bg-emerald-700 transition-colors gap-2">
        Post <MdPostAdd />
      </button>
    </div>
  );
}

export default Post;
