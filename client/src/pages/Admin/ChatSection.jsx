import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Chat from "../../Components/Chat";

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState("");

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

  useEffect(() => {
    console.log(selectedChat);
  }, [selectedChat]);

  return (
    <div className="bg-[#5d9e96] h-screen w-full flex flex-row">
      <div className="flex-[0.25]">
        <Sidebar
          data={data}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>
      <div className="flex-[0.75]">
        <Chat chat={message} />
      </div>
    </div>
  );
};

export default ChatSection;
