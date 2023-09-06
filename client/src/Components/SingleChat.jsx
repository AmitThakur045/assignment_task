/* eslint-disable react/prop-types */

const SingleChat = ({ messageList, bottomRef }) => {
  return (
    <div id="box" className="absolute top-0 bg-[#2a3e3b] w-full pb-[5rem] p-2 pt-[1rem] h-[90vh] overflow-y-scroll">
      {messageList?.map((message) => (
        <h2
          className={`${
            message.type === "ADMIN"
              ? "bg-[#456c67] mr-auto"
              : "bg-[#eb8a30] ml-auto"
          } w-fit max-w-sm p-2 rounded-md text-white my-1`}
          key={message.id}
        >
          {message.content}
        </h2>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default SingleChat;
