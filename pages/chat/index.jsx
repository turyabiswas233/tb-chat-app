import { useRouter } from "next/router";
import Sidbar from "../../components/Sidbar";
import { auth } from "../../fbConf";
function index() {
  const router = useRouter();
  return (
    <div
      className="flex gap-2 p-2 overflow-hidden
    relative w-full h-full bottom-2"
    >
      {auth.currentUser ? (
        <>
          <Sidbar />

          <div className="flex justify-center items-center w-full h-full col-span-3">
            <h3 className="font-bold text-3xl px-3 text-center text-zinc-600">
              Select a chat inbox to start message
            </h3>
          </div>
        </>
      ) : (
        <>
          <h2
            className="my-auto mx-auto relative h-full flex
        justify-center items-center md:text-2xl text-lg w-2/3 capitalize text-center text-zinc-700 break-words"
          >
            Login to see data
          </h2>
        </>
      )}
    </div>
  );
}

export default index;
