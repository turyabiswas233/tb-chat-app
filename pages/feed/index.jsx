import { useState } from "react";
import { MdAdd } from "react-icons/md";
import Card from "../../components/Card";
import { useAuthContext } from "../../components/context/AuthContext";
import Post from "../../components/Post";
import { auth } from "../../fbConf";

const posts = [
  {
    author: { name: "Turya", photo: "" },
    blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, unde reiciendis doloribus deserunt dolore nulla, quo praesentium expedita explicabo, aliquam ratione corrupti delectus officia cupiditate quidem quibusdam dolores cumque assumenda!",
    likes: 5,
  },
  {
    author: { name: "Sajid al hasan", photo: "" },
    blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, unde reiciendis doloribus deserunt dolore nulla, quo praesentium expedita explicabo, aliquam ratione corrupti delectus officia cupiditate quidem quibusdam dolores cumque assumenda!",
    likes: 4,
  },
  {
    author: { name: "shuvra biswas", photo: "" },
    blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, unde reiciendis doloribus deserunt dolore nulla, quo praesentium expedita explicabo, aliquam ratione corrupti delectus officia cupiditate quidem quibusdam dolores cumque assumenda!",
    likes: 15,
  },
  {
    author: { name: "ashraful alam", photo: "" },
    blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, unde reiciendis doloribus deserunt dolore nulla, quo praesentium expedita explicabo, aliquam ratione corrupti delectus officia cupiditate quidem quibusdam dolores cumque assumenda!",
    likes: 9,
  },
];
function Feed() {
  const [pre, setpre] = useState(false);
  const { currentUser } = useAuthContext();

  function handlePost() {
    setpre(!pre);
  }
  return (
    <div className=" mx-auto h-fit w-11/12 max-w-screen-lg py-3 text-gray-200  ">
      {/* notice */}
      <h2 className="text-rose-600 font-bold text-2xl text-center mt-4">
        This page is under construction!
      </h2>
      <h4 className="text-gray-600 text-center mb-4">
        It is just demo, will soon be published for public.
      </h4>
      {/* new post */}
      <section className="relative ">
        {currentUser && (
          <button
            className="bg-slate-800 text-white rounded-full p-2 px-4 flex items-center capitalize sticky top-0 left-1/2 -translate-x-1/2"
            style={{
              filter: `brightness(${pre ? 0.3 : 1})`,
            }}
            onClick={handlePost}
            disabled={pre}
          >
            create Post{" "}
            <MdAdd
              enableBackground={true}
              className="bg-blue-400 mx-2 rounded-full"
            />
          </button>
        )}
        {pre && <Post togglePost={handlePost} />}
      </section>
      {/* posts */}
      <section className="md:grid md:grid-cols-2 gap-2 md:justify-between">
        {posts.map((data, id) => {
          return (
            <Card
              key={id}
              authorName={data.author.name}
              authorPhoto={data.author.photo}
              blog={data.blog}
              likes={data.likes}
              bright={pre ? 0.3 : 1}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Feed;
