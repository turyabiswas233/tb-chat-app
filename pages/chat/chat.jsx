// import modules & components
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../fbConf";
import Message from "../../components/Message";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

// main function
function Chat({ grpInfo }) {
  const user = auth.currentUser;
  const router = useRouter();
  const { id } = router.query;
  const [text, settxt] = useState("");
  const bottomChat = useRef();
  

  {
    /*get messages from DB */
  }

  const [snapshot, load, error] = useCollection(
    collection(db, `groups/${id}/messages`)
  );
  
  const chats = snapshot?.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => {
      if (a.time < b.time) return -1;
    });

  const MemoMsg = () => {
    if (chats?.length == 0)
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
    if (load) {
      return (
        <div
          className="relative h-full flex
        justify-center items-center
        "
        >
          <p className="md:text-2xl text-lg w-2/3 capitalize text-center text-zinc-700 break-words">
            Loading...
          </p>
        </div>
      );
    } else
      return chats?.map((doc) => {
        return (
          <Message
            key={doc?.id}
            id={doc?.id}
            text={doc?.text}
            sender={doc?.senderMail}
            time={doc?.time}
            email={user?.email}
            img={doc?.image}
          />
        );
      });
  };

  // ref to chat bottom

  useEffect(() => {
    setTimeout(
      bottomChat?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      }),
      100
    );
  }, [chats]);

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

  //main body

  return (
    <>
      <div className="w-full h-full relative flex flex-col">
        {
          <div className="bg-[#3333] p-2 w-full h-fit rounded-md">
            <p className="text-lg md:text-2xl text-cyan-700 font-extrabold font-sans uppercase mx-auto w-fit">
              {grpInfo?.grpname ? grpInfo?.grpname : "Your Group"}
            </p>
            <p className="text-sm capitalize">
              Admin:
              <span className="dark:text-blue-600 text-blue-900 mx-2">
                {grpInfo?.adminName ? grpInfo?.adminName : ""}
              </span>
            </p>
          </div>
        }
        <form
          className="flex flex-col justify-between overflow-hidden h-full w-full"
          onSubmit={(e) => {
            e.preventDefault();
            sendMsg(text);
            setshemoji(false);
            settxt("");
          }}
        >
          {/* first part msgs */}
          <div className="overflow-y-auto p-2 flex flex-col chatbox">
            {/* messege section */}
            <MemoMsg />
            <div ref={bottomChat}></div>
          </div>
          {/* second pard msg tool */}

          <div className="flex items-center justify-between w-full h-[50px] text-sm pt-1">
            {/* message sent btn section */}
            <input
              className="w-2/3 md:w-full min-w-xs mx-2 rounded-md resize-none outline-none border-none dark:bg-zinc-900 bg-zinc-400
          dark:text-zinc-100 px-2 h-full overflow-hidden 
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
          uppercase tracking-wider"
            >
              send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Chat;
