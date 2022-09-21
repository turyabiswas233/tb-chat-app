import Image from "next/image";
import { MdFace } from "react-icons/md";
function Message({ email, sender, img, text }) {
  return (
    <>
      {email == sender ? (
        <p className="self-end flex items-center">
          <span className="p-2 rounded-xl rounded-br-none dark:bg-slate-800 bg-slate-600 w-fit h-fit m-2 max-w-[40vw] ">
            {text}
          </span>
          {img ? (
            <Image className=" rounded-full" src={img} height={20} width={20} />
          ) : (
            <MdFace />
          )}
        </p>
      ) : (
        <p className="self-start flex flex-row-reverse items-center">
          <span className="p-2 rounded-xl rounded-bl-none dark:bg-slate-800 bg-slate-600 w-fit h-fit m-2 max-w-[40vw] ">
            {text}
          </span>
          {img ? (
            <Image className=" rounded-full" src={img} height={20} width={20} />
          ) : (
            <MdFace />
          )}
        </p>
      )}
    </>
  );
}

export default Message;
