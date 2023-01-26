// import modules & components
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../fbConf";
import Message from "../../components/Message";
import RightSideBar from "../../components/RightSideBar";
import Loading from "../../components/loading/loading";
import { addDoc, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
//icons
import { FcInfo } from "react-icons/fc";

// main function
function Chat({ grpInfo }) {
  const user = auth.currentUser;
  const router = useRouter();
  const { id } = router.query;
  const text = useRef(null);
  const [txt, settxt] = useState("");
  const bottomChat = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const [noText, setNoText] = useState(false);
  {
    /*get messages from DB */
  }
  const chatRef = collection(db, `groups/${id}/messages`);

  const [snapshot, load, error] = useCollection(chatRef);
  const chatsRef = useRef([]);
  let preDate =
    chatsRef.current?.values &&
    new Date(chatsRef.current?.values[0]?.time).getDate();
  const memoMsg = useMemo(() => {
    if (chatsRef.current?.values?.length == 0)
      return (
        <div className="relative h-full flex justify-center items-center">
          <p className="md:text-2xl text-lg w-2/3 capitalize text-center text-zinc-700/60 break-words">
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
          <Loading w={40} h={40} />
        </div>
      );
    }
    return chatsRef.current.values?.map((doc, id, arr) => {
      let curDate = new Date(doc?.time).getDate();
      let showDateOnce = preDate == curDate;
      preDate = curDate;

      return (
        <Message
          key={doc?.id}
          id={doc?.id}
          text={doc?.text}
          sender={doc?.senderUID}
          senderName={user?.displayName !== doc?.senderName && doc?.senderName}
          uid={user?.uid}
          img={arr[id + 1]?.image !== doc?.image && doc?.image}
          time={doc?.time}
          showTime={id != 0 && showDateOnce ? false : true}
        />
      );
    });
  }, [chatsRef.current?.values]);

  useEffect(() => {
    chatsRef.current.values = snapshot?.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        if (a.time < b.time) return -1;
      });
  });
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
  }, [chatsRef.current?.values]);

  // add new message to database
  async function sendMsg(txt) {
    const date = new Date();
    const data = {
      text: `${txt}`,
      time: date?.getTime(),
      image: user?.photoURL,
      senderUID: user?.uid,
      senderEmail: user?.uid,
      senderName: user?.displayName,
    };
    const docRef = collection(db, `groups/${id}/messages`);
    await addDoc(docRef, data)
      .then(() => {
        settxt("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const GroupInfo = ({ grp }) => {
    return (
      <div className="p-2 w-full h-fit border-b border-gray-400 sticky top-0 z-50">
        <p className="text-lg md:text-2xl font-extrabold font-sans ml-2 w-fit">
          {grp?.grpname ? grp?.grpname : ""}
        </p>
        {grp?.grpname && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 gap-2 grid text-md  
         rounded-full w-6 h-6 text-center items-center 
         cursor-pointer"
            onClick={() => setShowInfo(!showInfo)}
          >
            <FcInfo />
          </span>
        )}
      </div>
    );
  };
  const Send = (
    <svg
      width="40"
      height="40"
      viewBox="0 0 134 135"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_15_3)">
        <path
          d="M109.945 16.9268L22.0113 58.7074C20.0853 59.6225 20.7373 62.5138 22.8696 62.5138H57.2759C57.7227 62.5138 58.1567 62.3642 58.5086 62.0888L97.907 31.2527C99.6633 29.8781 102.011 31.975 100.844 33.875L73.528 78.3135C73.2254 78.8058 73.1505 79.405 73.3227 79.9567L82.3034 108.735C82.8918 110.62 85.5666 110.602 86.1296 108.709L112.72 19.3034C113.214 17.6439 111.509 16.1838 109.945 16.9268Z"
          fill="#202231"
        />
        <path
          d="M109.945 16.9268L22.0113 58.7074C20.0853 59.6225 20.7373 62.5138 22.8696 62.5138H57.2759C57.7227 62.5138 58.1567 62.3642 58.5086 62.0888L97.907 31.2527C99.6633 29.8781 102.011 31.975 100.844 33.875L73.528 78.3135C73.2254 78.8058 73.1505 79.405 73.3227 79.9567L82.3034 108.735C82.8918 110.62 85.5666 110.602 86.1296 108.709L112.72 19.3034C113.214 17.6439 111.509 16.1838 109.945 16.9268Z"
          stroke="#21222E"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_15_3"
          x="0.365967"
          y="0.226593"
          width="132.942"
          height="134.412"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.128403 0 0 0 0 0.133479 0 0 0 0 0.179167 0 0 0 0.4 0"
          />
          <feBlend
            mode="darken"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_15_3"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_15_3"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
  const Attach = (
    <svg
      width="40"
      height="40"
      viewBox="0 0 82 95"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_18_11)">
        <path
          d="M54.5 58.5V37.25C54.5 29.6561 48.3439 23.5 40.75 23.5V23.5C33.1561 23.5 27 29.6561 27 37.25V54.5C27 59.7467 31.2533 64 36.5 64V64C41.7467 64 46 59.7467 46 54.5V42.25C46 39.0744 43.4256 36.5 40.25 36.5V36.5C37.0744 36.5 34.5 39.0744 34.5 42.25V49"
          stroke="#232323"
          strokeWidth="4"
        />
      </g>
      <g filter="url(#filter1_d_18_11)">
        <path
          d="M9.00244 34.8043C9.07953 37.0121 10.9318 38.7393 13.1396 38.6622C15.3474 38.5851 17.0747 36.7329 16.9976 34.5251C16.9205 32.3173 15.0682 30.59 12.8604 30.6671C10.6526 30.7442 8.92534 32.5965 9.00244 34.8043ZM12.7189 35.36L61.1303 54.9277L61.6924 53.537L13.2811 33.9693L12.7189 35.36Z"
          fill="#232323"
          fillOpacity="0.75"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_18_11"
          x="0"
          y="0.5"
          width="81.5"
          height="94.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="12.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18_11"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18_11"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_18_11"
          x="5"
          y="30.6646"
          width="60.6924"
          height="32.2631"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18_11"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18_11"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );

  //handle submit message
  function handleSubmit(e) {
    e?.preventDefault();
    if (!user) {
      alert("Please login to send message to your group");
    } else if (txt == "") setNoText(true);
    else
      sendMsg(txt)
        .then(() => {
          settxt("");
        })
        .catch((err) => {
          console.log(err);
        });
  }

  useEffect(() => {
    if (noText) text.current.focus();
  }, [noText]);

  //main body
  if (user)
    return (
      <>
        <div className="w-full h-full relative flex flex-row p-0">
          {/* group info panel */}
          <section className="flex-auto flex flex-col w-auto max-w-2xl mx-auto">
            <GroupInfo grp={grpInfo} />

            {/* first part msgs */}
            <div className="overflow-y-auto p-2 pt-16 flex flex-col chatbox flex-1">
              {/* messege section */}
              {memoMsg}
              <div ref={bottomChat}></div>
            </div>
            {/* handle message send */}
            <div className="flex bg-slate-900/50 justify-between overflow-hidden h-16 w-11/12 mx-auto rounded-2xl py-px">
              {/* pard msg tool || input and submit*/}
              {/* message sent btn section */}
              <div
                className={`flex items-center  rounded-2xl justify-between w-full min-h-fit text-sm p-1 ${
                  noText ? "ring-1 ring-rose-600 ring-inset" : ""
                }`}
              >
                <button
                  type="reset"
                  className="hover:bg-primary_bg_dark px-3 rounded-lg font-bold transition-all w-12 flex "
                >
                  {Attach}
                </button>
                <input
                  className={`bg-transparent w-auto md:w-full min-w-xs mx-2 rounded-md resize-none outline-none border-none flex-1 text-amber-50 p-2 overflow-y-auto break-words placeholder:text-zinc-700 h-16 `}
                  ref={text}
                  type="text"
                  required
                  value={txt}
                  placeholder="type a message"
                  onChange={(e) => {
                    settxt(e.target.value);
                    setNoText(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key == "Enter" && txt !== "") {
                      handleSubmit();
                    } else if (e.key == "Enter" && txt == "") {
                      setNoText(true);
                    }
                  }}
                />

                <button
                  className="hover:bg-primary_bg_dark px-3 rounded-lg font-bold transition-all w-12 flex "
                  onClick={handleSubmit}
                >
                  {Send}
                </button>
              </div>
            </div>
          </section>
          <RightSideBar showMe={showInfo} />
        </div>
      </>
    );
}

export default Chat;
