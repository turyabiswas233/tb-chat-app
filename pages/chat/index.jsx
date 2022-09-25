import { useRouter } from "next/router";
import Sidbar from "../../components/Sidbar";
function index() {
  const router = useRouter();
  return (
    <div
      className="flex gap-2 p-2 overflow-hidden
    relative w-full h-full bottom-2"
    >
      <Sidbar />

      <div className="flex justify-center items-center w-full h-full col-span-3">
        <h3 className="font-bold text-3xl px-3 text-center text-zinc-600">
          Select a chat inbox to start message
        </h3>
      </div>
    </div>
  );
}

export default index;
