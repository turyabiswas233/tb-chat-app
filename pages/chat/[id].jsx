import Chat from "./chat";
import Sidbar from "../../components/Sidbar";
import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, where } from "firebase/firestore";
import { auth, db } from "../../fbConf";

function Chats() {
  const router = useRouter();
  const user = auth.currentUser;
  const [grpInfo, setgrpInfo] = useState({});
  const { id } = router.query;
  const [render, setrender] = useState(true);
  const arrRef = useRef();

  {
    /*fetch group details*/
  }
  // get grp info
  async function getGrpDetails() {
    const grpRef = doc(db, `groups/${id}`);
    const grpDet = await getDoc(grpRef);

    if (grpDet?.exists()) {
      setgrpInfo(grpDet?.data());
    }
  }

  // call function to get grp
  useEffect(() => {
    getGrpDetails().then(() => {
      setrender(false);
    });
  }, [id, render]);

  return (
    <div
      className="flex gap-2 p-2 overflow-auto
    relative w-full h-full bottom-2
    "
    >
      <Sidbar />
      <Chat grpInfo={grpInfo} />
    </div>
  );
}

export default Chats;
