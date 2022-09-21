// import modules & components
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useRef } from "react";
import Message from "../../components/Message";
import { auth, db } from "../../fbConf";
// main function
function Chat() {
  const user = auth.currentUser;
  const router = useRouter();
  const { id } = router.query;
  const [msgs, setmsgs] = useState([]);
  const [text, settxt] = useState("");
  const [render, setrender] = useState(true);
  const bottomChat = useRef();

  async function getDb() {
    const ref = collection(db, `groups/${id}/messages`);
    const data = await getDocs(ref);
    setmsgs(
      data?.docs
        ?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          if (a.time < b.time) return -1;
        })
    );
  }

  useEffect(() => {
    getDb().then(() => {
      setrender(false);
    });
  }, [render]);

  const memo = useMemo(() => {
    if (msgs?.length == 0)
      return (
        <div
          className="relative h-full flex
        justify-center items-center
        "
        >
          <p className="md:text-2xl text-lg w-2/3 capitalize text-center text-zinc-700 break-words">
            No conversation has been started to this group
          </p>
        </div>
      );
    return msgs?.map((doc) => {
      return (
        <Message
          key={doc?.id}
          text={doc?.text}
          sender={doc?.senderMail}
          time={doc?.time}
          email={user?.email}
          img={doc?.image}
        />
      );
    });
  }, [msgs]);

  // ref to chat bottom
  useEffect(() => {
    setTimeout(
      bottomChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
      100
    );
  }, [msgs]);

  // add new message to database
  async function sendMsg(txt) {
    const date = new Date();
    const data = {
      text: txt,
      senderMail: user?.email,
      date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
      time: date?.getTime(),
      image: user?.photoURL,
    };
    const docRef = collection(db, `groups/${id}/messages`);
    await addDoc(docRef, data).catch((err) => {
      alert(err.message);
    });
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMsg(text).then(() => {
          settxt("");
          setrender(true);
        });
      }}
      className="grid relative col-span-3  grid-rows-6 overflow-hidden ml-3 "
    >
      <div className="overflow-y-auto p-2 flex flex-col row-span-5 chatbox text-white">
        {/* messege section */}
        {memo}
        <div ref={bottomChat}></div>
      </div>
      <div className="grid py-3 items-center grid-cols-3 w-full ">
        {/* message sent btn section */}
        <input
          className="col-span-2 mx-2 rounded-md resize-none outline-none border-none dark:bg-zinc-900 bg-zinc-400
          dark:text-zinc-100 md:text-lg
             px-2 h-full overflow-hidden 
             placeholder:text-zinc-700 
            "
          type="text"
          required
          placeholder="type a message"
          onChange={(e) => {
            settxt(e.target.value);
          }}
          value={text}
        />

        <button
          type="submit"
          className="bg-stone-900 px-3 h-full py-2 rounded-lg mx-2 hover:bg-white text-white hover:text-stone-900 font-bold transition-all border-stone-900 border-4
          uppercase text-sm md:text-xl tracking-wider"
        >
          send
        </button>
      </div>
    </form>
  );
}

export default Chat;
