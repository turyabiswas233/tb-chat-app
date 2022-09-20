import Chat from "./chat";
import Sidbar from "../../components/Sidbar";
function Chats() {
  return (
    <div className="grid grid-cols-4 p-3 h-5/6 overflow-hidden">
      <Sidbar />
      <Chat />
    </div>
  );
}

export default Chats;
