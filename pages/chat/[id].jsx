import Chat from "./chat";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../fbConf";
import { useAuthContext } from "../../components/context/AuthContext";

function Chats() {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [grpInfo, setgrpInfo] = useState({});
  const { id } = router.query;
  const [render, setrender] = useState(true);

  //fetch group details
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
    <>
      <Chat grpInfo={grpInfo} />
      {!currentUser && (
        <>
          <div className="my-auto w-3/5 mx-auto text-center text-zinc-700">
            <h2>
              You must <span className="font-bold uppercase tracking-tighter">sign in</span> to view chats in this group
            </h2>
          </div>
        </>
      )}
    </>
  );
}

export default Chats;
