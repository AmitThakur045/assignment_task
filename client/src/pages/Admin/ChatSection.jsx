import { useEffect, useRef, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Chat from "../../Components/Chat";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { initSocket } from "../../Utils/socket";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../../Utils/Actions";

const data = [
  {
    id: "1",
    name: "Amit",
    email: "test@gmail.com",
    chatId: "1234567",
  },
  {
    id: "2",
    name: "Amit2",
    email: "test2@gmail.com",
    chatId: "1234",
  },
  {
    id: "3",
    name: "Amit3",
    email: "test3@gmail.com",
    chatId: "1256qwdb7",
  },
  {
    id: "4",
    name: "Amit4",
    email: "test4@gmail.com",
    chatId: "1356wqon7",
  },
  {
    id: "5",
    name: "Amit4",
    email: "test4@gmail.com",
    chatId: "1356ojm2w7",
  },
  {
    id: "6",
    name: "Amit4",
    email: "test4@gmail.com",
    chatId: "1356thb7",
  },
  {
    id: "7",
    name: "Amit4",
    email: "test4@gmail.com",
    chatId: "1356qdq7",
  },
  {
    id: "8",
    name: "Amit4",
    email: "test4@gmail.com",
    chatId: "1356eqdwq7",
  },
  {
    id: "9",
    name: "Amit4",
    email: "test4@gmail.com",
    chatId: "135sd67",
  },
  {
    id: "10",
    name: "Amit4",
    email: "test4@gmail.com",
    chatId: "13567jg",
  },
];

const message = {
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

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState("");
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("admin")).userList
  );
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const messageListRef = useRef(null);
  const socketRef = useRef(null);

  // fetching the initial message list
  useEffect(() => {
    if (selectedChat.length > 0) {
      const fetchChat = async () => {
        setLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE}/api/chat/fetchchat`,
          {
            chatId: selectedChat,
          }
        );

        messageListRef.current = res.data;
        setLoading(false);
      };

      fetchChat();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!loading) {
      const init = () => {
        socketRef.current = initSocket();

        socketRef.current.on("connect_error", (err) => handleErrors(err));
        socketRef.current.on("connect_failed", (err) => handleErrors(err));
        function handleErrors(e) {
          console.log(e);
          alert("Socket connection failed, try again later.");
          // navigate("/");
        }

        socketRef.current.emit(ACTIONS.JOIN, {
          chatId: selectedChat,
          userId: admin._id,
        });

        socketRef.current.on(
          ACTIONS.ADMIN_RECIEVE_MESSAGE,
          ({ message, type }) => {
            const obj = {
              id: uuid(),
              content: message,
              type: type,
            };
            messageListRef.current?.messageList.push(obj);
            setMessageList(messageListRef.current);
          }
        );
      };

      init();

      return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOIN);
        socketRef.current.off(ACTIONS.ADMIN_RECIEVE_MESSAGE);
      };
    }
  }, [loading]);

  console.log("admin message", messageList);

  return (
    <div className="bg-[#5d9e96] h-screen w-full flex flex-row">
      <div className="flex-[0.25]">
        <Sidebar
          data={userList}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>
      <div className="flex-[0.75]">
        <Chat
          messageListRef={messageListRef}
          admin={admin}
          chatId={selectedChat}
          socketRef={socketRef}
          messageList={messageList}
          setMessageList={setMessageList}
        />
      </div>
    </div>
  );
};

export default ChatSection;
