/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react";

const UserChatSection = () => {
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);

  const chat = {
    chatId: "123456y2h",
    chatName: "userName",
    client: "qyhjbanksds",
    admin: "ainkjn,ads",
    messages: [
      {
        id: "1",
        content: "hellow",
        type: "USER",
      },
      {
        id: "2",
        content: "hellowwcknc",
        type: "USER",
      },
      {
        id: "3",
        content: "hellow",
        type: "ADMIN",
      },
      {
        id: "4",
        content: "hellow edomwxp iwnixq",
        type: "USER",
      },
      {
        id: "5",
        content: "hellow ASLHNIOXBW",
        type: "ADMIN",
      },
      {
        id: "6",
        content: "hellow ajgbax sx xkKSAXx akxaxb ka",
        type: "USER",
      },
      {
        id: "7",
        content: "hellowajgdbakbad",
        type: "ADMIN",
      },
      {
        id: "8",
        content: "hellowajgdbakbad",
        type: "USER",
      },
      {
        id: "9",
        content:
          "hellowajgdbakbad cacaNkjbdicb ck iuc wd cuiw fbw cdchd vivcfkvgbkvbwfouvhefv efv oe vo ebov oef vfv8NNWEDCDKJWEC OWNCONEWLC OQWNCONEWCOD CBDW",
        type: "ADMIN",
      },
      {
        id: "10",
        content: "hellowajgdbakbad",
        type: "ADMIN",
      },
      {
        id: "11",
        content: "hellowajgdbakbad",
        type: "USER",
      },
      {
        id: "12",
        content: "hellowajgdbakbad",
        type: "USER",
      },
    ],
  };

  useEffect(() => {
    console.log("Scroll");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="bg-[#5d9e96] h-screen w-full flex flex-col">
      <h2 className="w-full bg-black/30 p-2 h-[4.5rem] text-zinc-300 font-semibold text-xl flex items-center justify-center ">
        Admin
      </h2>
      <div className="relative h-[90vh] border-2 border-white flex overflow-hidden flex-col justify-center">
        <div className="absolute top-0 bg-[#2a3e3b] w-full pb-[5rem] p-2 pt-[1rem] h-[90vh] overflow-y-scroll">
          {chat.messages.map((message) => (
            <h2
              className={`${
                message.type === "ADMIN"
                  ? "bg-[#456c67] ml-auto"
                  : "bg-[#eb8a30] mr-auto"
              } w-fit max-w-sm p-2 rounded-md text-white my-1`}
              key={message.id}
            >
              {message.content}
            </h2>
          ))}
          <div ref={bottomRef}></div>
        </div>

        <form className="absolute -bottom-4 py-2 bg-[#1c312e] flex gap-2 items-center justify-center w-full px-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#456c67] p-2 rounded-md text-zinc-300 outline-none border-0 active:outline-none hover:bg-[#2e4a46] duration-150"
            placeholder="Enter the message..."
          />
          <button className="bg-[#eb8a30] rounded-md p-2 px-4 text-white">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserChatSection;
