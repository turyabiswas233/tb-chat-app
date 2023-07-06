import { auth } from "../../fbConf";
function index() {
  const currentUser = auth.currentUser;

  if (currentUser)
    return (
      <div className="mx-auto flex overflow-auto relative w-2/3 h-full bottom-0 pb-0 ">
        <div className="flex justify-center items-center w-2/3 mx-auto h-full col-span-3">
          <h3 className="font-bold text-3xl px-3 text-center text-zinc-600 ">
            Select a chat inbox to start message
          </h3>
        </div>
      </div>
    );
  if (!currentUser) {
    return (
      <div className="mx-auto flex justify-center items-center w-2/3 h-full col-span-3">
        <h3 className="font-bold text-3xl px-3 text-center text-zinc-600">
          You must login to see this page
        </h3>
      </div>
    );
  }
}

export default index;
