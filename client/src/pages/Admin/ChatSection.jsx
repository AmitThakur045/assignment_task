import { useEffect, useRef, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Chat from "../../Components/Chat";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { initSocket } from "../../Utils/socket";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../../Utils/Actions";

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState("");
  const [chatName, setChatName] = useState("");
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
        setMessageList(res.data.messageList);
        setChatName(res.data.chatName);
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

            setMessageList((prev) => [...prev, obj]);
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
          chatName={chatName}
          messageList={messageList}
          setMessageList={setMessageList}
        />
      </div>
    </div>
  );
};

export default ChatSection;
