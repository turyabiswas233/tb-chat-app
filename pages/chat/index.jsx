import { useRouter } from "next/router";
import Sidbar from "../../components/Sidbar";
function index() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 p-3 h-5/6 overflow-hidden">
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
