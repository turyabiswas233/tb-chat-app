import Image from "next/image";
import { MdFace } from "react-icons/md";
function Message({ email, sender, img, text }) {
  return (
    <>
      {email == sender ? (
        <p className="self-end flex relative max-h-max">
          <span className="p-2 rounded-xl rounded-br-none dark:bg-slate-800 bg-slate-600 w-fit h-fit m-2 max-w-[40vw] text-xs md:text-sm text-lime-100 mr-7">
            {text}
          </span>
          <div className="absolute bottom-1 right-0 h-fit ">
            {img ? (
              <Image
                className=" rounded-full "
                src={img}
                height={20}
                width={20}
              />
            ) : (
              <MdFace />
            )}
          </div>
        </p>
      ) : (
        <p className="self-start flex flex-row-reverse items-center relative">
          <span className="p-2 rounded-xl rounded-bl-none dark:bg-slate-600 bg-slate-400 w-fit h-fit m-2 max-w-[40vw] text-xs md:text-sm ml-7">
            {text}
          </span>
          <div className="absolute bottom-1 left-0 h-fit ">
            {img ? (
              <Image
                className=" rounded-full "
                src={img}
                height={20}
                width={20}
              />
            ) : (
              <MdFace />
            )}
          </div>
        </p>
      )}
    </>
  );
}

export default Message;
