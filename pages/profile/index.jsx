import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Input from "../../components/Input";
import { useAuthContext } from "../../components/context/AuthContext";
import { storage, auth, db } from "../../fbConf";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

function Profile() {
  const { currentUser } = useAuthContext();
  const [userInfo, setuserInfo] = useState({
    displayName: "",
    photo: undefined,
    email: "",
  });
  const [progress, setprogress] = useState(0);
  const [curImg, setCurImg] = useState("");
  const [load, setload] = useState(false);
  const [success, setsuccess] = useState(false);
  const [fail, setfail] = useState(false);

  function getName(e) {
    setuserInfo((pre) => ({ ...pre, displayName: e.target.value }));
  }
  function getPhoto(e) {
    if (e.target.files.length !== 0)
      setCurImg(URL.createObjectURL(e.target.files[0]));
    setuserInfo((pre) => ({ ...pre, photo: e.target.files[0] }));
  }
  function getEmail(e) {
    setuserInfo((pre) => ({ ...pre, email: e.target.value }));
  }
  //upload data in firebase storage
  function updateInfo(e) {
    e.preventDefault();

    // 'file' comes from the Blob or File API
    if (userInfo.photo) {
      const photoRef = ref(storage, `photo/${userInfo.photo?.name}`);
      const uploadTask = uploadBytesResumable(photoRef, userInfo.photo);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setprogress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("error", error);
        },
        () => {
          //get photo url
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (downloadURL) updateUser(userInfo.displayName, downloadURL);
          });
        }
      );
    } else {
      updateUser(userInfo.displayName);
    }
  }
  async function updateUser(name, link) {
    const uid = auth.currentUser.uid;
    const dbref = doc(db, "users", uid);
    setload(true);
    updateProfile(auth.currentUser, {
      displayName: name ? name : auth.currentUser.displayName,
      photoURL: link ? link : auth.currentUser.photoURL,
    })
      .then(() => {
        setfail(false);
        updateDoc(dbref, {
          name: auth.currentUser.displayName,
          image: auth.currentUser.photoURL,
        })
          .then(() => {
            // final action for update user
            setload(false);
            setsuccess(true);
            setfail(false);
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          })
          .catch((err) => {
            setsuccess(false);
            setload(false);
            setfail(true);
            console.log(err);
          });
      })
      .catch((err) => {
        setsuccess(false);
        setload(false);
        setfail(true);
        console.log(err);
      });
  }

  if (currentUser)
    return (
      <div className="flex flex-col m-auto h-fit">
        <div>
          <form className="space-y-5 grid" onSubmit={updateInfo}>
            {/* profile name */}
            <section
              className={`bg-inactivetxt/30 text-white rounded-full p-4 shadow-[0_0_15px_-10px] shadow-rose-100 my-2 flex gap-2 transition-all items-center  relative ${
                userInfo.displayName !== "" && "ring-4 ring-owner_bg"
              }`}
            >
              <label htmlFor="name">Name: </label>
              <Input placeholder={"your name"} getValue={getName} />
            </section>
            {/* profile photo */}
            <section
              className={`bg-inactivetxt/30 text-white rounded-full p-4 shadow-[0_0_15px_-10px] shadow-rose-100 my-2 flex gap-2 transition-all items-center  relative ${
                userInfo.photo !== undefined && "ring-4 ring-owner_bg"
              }`}
            >
              <label htmlFor="file">Photo: </label>
              <Input
                type={"file"}
                ariaHidden={true}
                value={userInfo.photo}
                getValue={getPhoto}
              />
            </section>
            {/* show selected photo */}

            {userInfo.photo && (
              <section className="w-fit h-fit p-2 rounded-md bg-owner_bg mx-auto">
                {userInfo.photo && (
                  <img
                    className="h-32 w-56 object-cover rounded-md"
                    src={curImg}
                    width={200}
                    alt="choose photo with jpg, jpeg or png format"
                  />
                )}
              </section>
            )}

            <button
              className="bg-owner_bg/50 rounded-md px-5 py-2 font-bold transition-colors hover:bg-owner_bg capitalize disabled:bg-gray-700 w-24 disabled:cursor-not-allowed cursor-pointer"
              type="submit"
              disabled={
                userInfo.email !== currentUser?.email ||
                load ||
                (!userInfo.photo && !userInfo.displayName)
              }
            >
              {load ? "O" : "Update"}
            </button>

            {/* progress bar */}
            <p className=" bg-emerald-800/80 h-3 rounded-full relative ">
              <span
                className="absolute h-full bg-emerald-400 left-0 top-0 rounded-full"
                style={{
                  width: `${progress}%`,
                }}
              ></span>
            </p>
            {success && <p className="text-emerald-400">update success!</p>}
            {fail && <p className="text-rose-600">try again!</p>}
          </form>

          {/* profile user email */}
          <section
            className={`bg-inactivetxt/30 text-white rounded-full p-4 shadow-[0_0_15px_-10px] shadow-rose-100 my-10 flex gap-2 transition-all items-center  relative ${
              userInfo.email == currentUser?.email
                ? "ring-4 ring-owner_bg"
                : "ring-4 ring-rose-700"
            }`}
          >
            <label htmlFor="email">Email:</label>
            <Input
              placeholder={"confirm by email"}
              type={"email"}
              getValue={getEmail}
            />
          </section>
        </div>
      </div>
    );
  else {
    return (
      <>
        <h2 className="m-auto text-center text-gray-600">
          Please login to update your porfile
        </h2>
      </>
    );
  }
}

export default Profile;
