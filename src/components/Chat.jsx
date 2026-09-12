import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnection();

    // As soon as the page loads, the socket connection is made
    // and joinChat event is emitted.
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, newMessage }) => {
      console.log(firstName + " " + newMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, newMessage },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="border rounded-lg w-full max-w-3xl h-[80vh] min-h-[400px] mx-auto flex flex-col overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3">
        {messages.map((message, index) => {
          const isMyMessage = message.firstName === user.firstName;

          return (
            <div
              key={index}
              className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-8 sm:w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={
                      isMyMessage
                        ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                        : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                  />
                </div>
              </div>

              <div className="chat-header text-xs sm:text-sm">
                {message.firstName}
                <time className="text-xs opacity-50 ml-2">12:45</time>
              </div>

              <div className="chat-bubble text-sm sm:text-base">
                {message.newMessage}
              </div>

              <div className="chat-footer opacity-50 text-xs">
                {isMyMessage ? "Seen" : "Delivered"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input - Always at Bottom */}
      <div className="border-t p-3 sm:p-4 bg-base-100">
        <div className="flex items-center gap-2 w-full">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-1 min-w-0 text-sm sm:text-base"
          />

          <button
            className="btn btn-primary shrink-0 px-4 sm:px-6"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
