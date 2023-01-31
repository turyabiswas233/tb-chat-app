import Image from "next/image";

function Message({ uid, sender, img, text, time, showTime }) {
  // timeing function
  let now = new Date();
  let date = new Date(time);
  let today = new Date().getDate();
  let hr = date?.getHours();
  let min = date?.getMinutes();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  // time
  let initialDate = {
    dd: date?.getDate(),
    mm: months[date?.getMonth()],
    yy: date?.getFullYear(),
    day: days[date?.getDay()],
    time: {
      h: hr > 12 ? hr - 12 : hr == 0 ? 12 : hr,
      m: min < 10 ? `0${min}` : min,
      a_p: hr >= 12 ? "pm" : "am",
    },
  };
  let defer = today - initialDate.dd;
  let show_date_in_24hour = defer < 1;
  let yesterday = 1 <= defer && defer < 2;
  let show_date_in_7days = 2 <= defer && defer < 7;
  let in1_5min = now - time < 1.5 * 60 * 1000;
  //final time
  let finalTime = `${initialDate.dd} ${initialDate.mm} ${
    show_date_in_7days ? initialDate.day : initialDate.yy
  }`;

  // timeing function

  // linking part
  let isLink = text?.includes("http");
  var arr = (isLink && text?.split(/(http.*?\ )/)) || [];
  let lnid = 0;

  // sexy condition :")
  let isSexual =
    text?.includes("sex") || text?.includes("sexy") || text?.includes("porn");
  // sexy condition :")
  return (
    <>
      {showTime && !isSexual && (
        <span
          className="mx-auto font-extralight font-mono text-xs relative uppercase before:w-auto before:h-1 before:bg-black before:absolute top-0
          opacity-50 select-none py-5"
        >
          {initialDate.dd} {initialDate.mm},{" "}
          {show_date_in_24hour
            ? "today"
            : yesterday
            ? "yesterday"
            : show_date_in_7days
            ? initialDate.day
            : initialDate.yy}
        </span>
      )}
      {uid == sender ? (
        // user right side (myself)
        <div
          className="self-end flex relative max-h-max msg-class"
          title={
            isSexual == true
              ? "You should not sent such sexual text to any public place.\nIf you want to send some helpful message,\nthen type the words including a star(*) inside of the s*xual words."
              : ""
          }
        >
          <p
            className={`p-2 rounded-2xl ${
              img && "rounded-br-none"
            } bg-owner_bg w-fit h-fit my-px max-w-[40vw] text-sm  mr-7 shadow-xl shadow-slate-900/10 ${
              isSexual &&
              "opacity-40 pointer-events-none cursor-default select-none"
            }`}
            style={{
              wordBreak: "break-word",
            }}
          >
            {!isLink ? (
              text
            ) : (
              <>
                {arr?.map((txt, id) => {
                  if (txt?.includes("http" || "http") && !isSexual) {
                    lnid++;

                    return (
                      <>
                        <a
                          key={lnid}
                          className="font-bold hover:underline"
                          href={txt}
                          target="_blank"
                          title={
                            (txt?.includes("youtube") && "Youtube link") ||
                            (txt?.includes("facebook") && "Facebook Link") ||
                            (txt?.includes("twitter") && "Twitter link") ||
                            `Visit ${txt}`
                          }
                        >
                          [Link - {lnid}]
                        </a>{" "}
                      </>
                    );
                  }
                  return txt;
                })}
              </>
            )}
            <br />
            {!isSexual && (
              <span className="text-gray-200 font-extralight w-fit drop-shadow-md shadow-red-500 text-[.6rem] bg-transparent  text-right float-right px-1 -mr-1 tracking-wider select-none">
                {in1_5min
                  ? "Just Now"
                  : `${initialDate.time.h}:${initialDate.time.m} ${initialDate.time.a_p}`}
              </span>
            )}
          </p>
          {img && (
            <div className="absolute bottom-1 right-0 h-fit ">
              <Image
                className=" rounded-full "
                src={img}
                height={20}
                width={20}
                alt={"p.jpg"}
              />
            </div>
          )}
          {isSexual && (
            <span className="text-rose-500 absolute before:absolute before:w-2 before:h-2 h-fit before:rounded-full before:bg-red-600 before:right-0 before:top-0 before:translate-y-1/2 text-[.6em] min-w-max pr-3 m opacity-75 bottom-0 top-1/2 -translate-y-1/2 right-full select-none mx-3">
              Message could not be sent
            </span>
          )}
        </div>
      ) : (
        !isSexual && (
          // user left side (friends)

          <div className="self-start flex flex-row-reverse items-center relative msg-class ">
            <p
              className={`p-2 rounded-2xl bg-friend_bg w-fit h-fit my-px max-w-[40vw]  text-sm ${
                img && "rounded-bl-none"
              } ml-7 shadow-xl shadow-slate-900/10 ${
                isSexual &&
                "opacity-40 pointer-events-none cursor-default select-none"
              }`}
              style={{
                wordBreak: "break-word",
              }}
            >
              {!isLink ? (
                text
              ) : (
                <>
                  {arr?.map((txt, id) => {
                    if (txt?.includes("http" || "http")) {
                      lnid++;

                      return (
                        <>
                          <a
                            key={lnid}
                            className="font-bold hover:underline"
                            href={txt}
                            target="_blank"
                            title={
                              (txt?.includes("youtube") && "Youtube link") ||
                              (txt?.includes("facebook") && "Facebook Link") ||
                              (txt?.includes("twitter") && "Twitter link") ||
                              `Visit ${txt}`
                            }
                          >
                            [Link - {lnid}]
                          </a>{" "}
                        </>
                      );
                    }
                    return txt;
                  })}
                </>
              )}
              <br />
              <span className="text-gray-200 font-extralight w-fit drop-shadow-md shadow-red-500 text-[.6rem] bg-transparent text-right float-left select-none">
                {in1_5min
                  ? "Just Now"
                  : `${initialDate.time.h}:${initialDate.time.m} ${initialDate.time.a_p}`}
              </span>
            </p>
            {img && (
              <div className="absolute bottom-1 left-0 h-fit ">
                <Image
                  className=" rounded-full "
                  src={img}
                  height={20}
                  width={20}
                />
              </div>
            )}
          </div>
        )
      )}
    </>
  );
}

export default Message;
