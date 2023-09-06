/* eslint-disable react/prop-types */

const Sidebar = ({ data, selectedChat, setSelectedChat }) => {
  return (
    <div className="w-full h-screen flex flex-col text-zinc-300 gap-3">
      <div className="w-full">
        <h2 className="font-bold text-lg text-left w-full">Admin</h2>
      </div>
      <div className="flex flex-col items-center gap-2 h-full overflow-hidden">
        <h2>User List</h2>

        <ul className="h-[90vh] overflow-y-scroll w-full bg-black/30">
          {data?.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedChat(user.chatId)}
              className={`${
                selectedChat === user.chatId ? "bg-[#945d29]" : "bg-[#b07c4c]"
              } m-3 cursor-pointer hover:bg-[#7f5833] p-2 rounded-md`}
            >
              <h2>{user.name}</h2>
              <p>{user.chatId}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
