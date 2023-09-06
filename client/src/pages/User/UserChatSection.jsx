/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { ACTIONS } from "../../Utils/Actions";
import { initSocket } from "../../Utils/socket";
import SingleChat from "../../Components/SingleChat";

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

const UserChatSection = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  // const [socketId, setSocketId] = useState();
  const bottomRef = useRef(null);
  const socketRef = useRef(null);
  // const messageListRef = useRef(null);
  const client = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { chatId } = useParams();

  // fetching the initial message list
  useEffect(() => {
    const fetchChat = async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE}/api/chat/fetchchat`,
        {
          chatId,
        }
      );

      // messageListRef.current = res.data.messageList;
      setMessageList(res.data.messageList);
      setLoading(false);
    };

    fetchChat();
  }, []);

  const handleMessageSend = (e) => {
    e.preventDefault();
    const obj = {
      id: uuid(),
      content: message,
      type: "CLIENT",
    };
    // messageListRef.current.push(obj);
    const newMessage = messageList;
    newMessage.push(obj);
    setMessageList(newMessage);

    socketRef.current.emit(ACTIONS.CLIENT_SENT_MESSAGE, {
      message,
      chatId,
      type: "CLIENT",
      clientId: client._id,
    });
    setMessage("");
  };

  useEffect(() => {
    if (!loading) {
      const init = () => {
        socketRef.current = initSocket();

        console.log("socket");

        socketRef.current.on("connect_error", (err) => handleErrors(err));
        socketRef.current.on("connect_failed", (err) => handleErrors(err));
        function handleErrors(err) {
          console.log(err);
          console.log("Socket connection failed, try again later.");
          // navigate("/");
        }

        socketRef.current.emit(ACTIONS.JOIN, {
          chatId,
          userId: client._id,
        });

        socketRef.current.on(
          ACTIONS.CLIENT_RECIEVE_MESSAGE,
          ({ message, type }) => {
            const obj = {
              id: uuid(),
              content: message,
              type: type,
            };
            const newMessage = messageList;
            newMessage.push(obj);
            setMessageList(newMessage);

            // var newdoc = document.createElement("div");
            // newdoc.innerHTML = message;
            // document.getElementById("box").appendChild(newdoc);
          }
        );
      };

      init();

      return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOIN);
        socketRef.current.off(ACTIONS.CLIENT_RECIEVE_MESSAGE);
      };
    }
  }, [loading]);

  useEffect(() => {
    console.log("Scroll");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  console.log("user", messageList);

  return (
    <div className="bg-[#5d9e96] h-screen w-full flex flex-col">
      <h2 className="w-full bg-black/30 p-2 h-[4.5rem] text-zinc-300 font-semibold text-xl flex items-center justify-center ">
        Admin
      </h2>
      <div className="relative h-[90vh] border-2 border-white flex overflow-hidden flex-col justify-center">
        <SingleChat messageList={messageList} bottomRef={bottomRef} />

        <form
          onSubmit={handleMessageSend}
          className="absolute -bottom-4 py-2 bg-[#1c312e] flex gap-2 items-center justify-center w-full px-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#456c67] p-2 rounded-md text-zinc-300 outline-none border-0 active:outline-none hover:bg-[#2e4a46] duration-150"
            placeholder="Enter the message..."
          />
          <button
            disabled={message.length === 0}
            className="bg-[#eb8a30] rounded-md p-2 px-4 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserChatSection;
