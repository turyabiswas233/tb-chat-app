import { useContext } from "react";
import { user } from "../../components/context/AuthContext";

function index() {
  const { currentUser } = useContext(user);

  if (currentUser)
    return (
      <div
        className="flex overflow-auto relative w-full h-full bottom-0 pb-0"
      >
        <div className="flex justify-center items-center w-full h-full col-span-3">
          <h3 className="font-bold text-3xl px-3 text-center text-zinc-600">
            Select a chat inbox to start message
          </h3>
        </div>
      </div>
    );
    if(!currentUser) {
      return (
        <div className="flex justify-center items-center w-full h-full col-span-3">
          <h3 className="font-bold text-3xl px-3 text-center text-zinc-600">
            You must login to see this page
          </h3>
        </div>
      );
    }
}

export default index;
