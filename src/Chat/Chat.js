import React, { useEffect, useState } from "react";
import "./Chat.css";
import AddChatContainer from "./AddChatContainer";
import ChatCard from "./ChatCard";

function Chat() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    let storedChats = localStorage.getItem("chats") || [];
    if (storedChats.length > 0) {
      storedChats = JSON.parse(storedChats);
      setChats(storedChats);
    } else {
      localStorage.setItem("chats", "");
    }
  }, []);

  const addChat = ({ name, comment, time }) => {
    const chatObj = {
      name,
      comment,
      dateAndTime: Date.now(),
      replies: [],
    };
    let tempChats = [...chats];
    tempChats.push(chatObj);
    localStorage.setItem("chats", JSON.stringify(tempChats));
    setChats(tempChats);
  };

  const addReply = ({ name, comment, time, chatIdx }) => {
    const chatObj = {
      name,
      comment,
      dateAndTime: Date.now(),
    };
    let tempChats = [...chats];
    tempChats[chatIdx].replies.push(chatObj);
    localStorage.setItem("chats", JSON.stringify(tempChats));
    setChats(tempChats);
  };

  const chatDelete = (chatIdx, isReply, replyIdx = 0) => {
    let tempChats = [...chats];
    if (isReply) {
      tempChats[chatIdx].replies.splice(replyIdx, 1);
    } else {
      tempChats.splice(chatIdx, 1);
    }
    localStorage.setItem("chats", JSON.stringify(tempChats));
    setChats(tempChats);
  };

  const updateComment = (chatIdx, isReply, comment, replyIdx = 0) => {
    let tempChats = [...chats];
    if (isReply) {
      tempChats[chatIdx].replies[replyIdx].comment = comment;
    } else {
      tempChats[chatIdx].comment = comment;
    }
    localStorage.setItem("chats", JSON.stringify(tempChats));
    setChats(tempChats);
  };

  const sortChats = (order) => {
    const tempChats = [...chats];
    tempChats.forEach((chat) => {
      if (chat.replies) {
        if (order === "asc") {
          chat.replies.sort(
            (a, b) => parseFloat(a.dateAndTime) - parseFloat(b.dateAndTime)
          );
        } else {
          chat.replies.sort(
            (a, b) => parseFloat(b.dateAndTime) - parseFloat(a.dateAndTime)
          );
        }
      }
    });
    if (order === "asc") {
      tempChats.sort(
        (a, b) => parseFloat(a.dateAndTime) - parseFloat(b.dateAndTime)
      );
    } else {
      tempChats.sort(
        (a, b) => parseFloat(b.dateAndTime) - parseFloat(a.dateAndTime)
      );
    }
    setChats(tempChats);
  };

  return (
    <div>
      <AddChatContainer title="Comment" onSubmit={addChat} />
      {chats.length > 0 && (
        <div className="sortChats">
          Sort by{" "}
          <span className="sortText" onClick={() => sortChats("asc")}>
            Older First↓
          </span>{" "}
          <span className="sortText" onClick={() => sortChats("desc")}>
            Newer First↑
          </span>
        </div>
      )}
      <div>
        {chats.map((chat, i) => {
          return (
            <>
              <ChatCard
                chat={chat}
                replyChat={addReply}
                chatIdx={i}
                chatDelete={chatDelete}
                updateComment={updateComment}
              />
              <>
                {chat.replies.map((reply, replyIdx) => {
                  return (
                    <ChatCard
                      chat={reply}
                      chatIdx={i}
                      chatDelete={chatDelete}
                      updateComment={updateComment}
                      isReply={true}
                      replyIdx={replyIdx}
                    />
                  );
                })}
              </>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
