/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";

const Chat = ({ chat }) => {
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    console.log("Scroll");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="w-full h-screen overflow-hidden">
      <h2 className="w-full bg-black/30 p-2 h-[4.5rem] text-zinc-300 font-semibold text-xl flex items-center justify-center ">
        {chat.chatName}
      </h2>
      <div className="relative h-[90vh] border-2 border-white flex flex-col justify-center">
        <div className="absolute top-0 bg-[#2a3e3b] w-full pb-[5rem] p-2 h-[90vh] overflow-y-scroll">
          {chat.messages.map((message) => (
            <h2
              className={`${
                message.type === "ADMIN"
                  ? "bg-[#456c67] ml-auto"
                  : "bg-[#eb8a30] mr-auto"
              } w-fit max-w-sm p-2 rounded-md my-1`}
              key={message.id}
            >
              {message.content}
            </h2>
          ))}
          <div ref={bottomRef}></div>
        </div>

        <form className="absolute bottom-0 py-2 bg-[#1c312e] flex gap-2 items-center justify-center w-full px-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#456c67] p-2 rounded-md text-zinc-300 outline-none border-0 active:outline-none hover:bg-[#2e4a46] duration-150"
            placeholder="Enter the message..."
          />
          <button className="bg-[#eb8a30] rounded-md p-2 text-white">Go</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
