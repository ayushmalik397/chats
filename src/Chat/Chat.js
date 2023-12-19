import React, { useEffect, useState } from "react";
import "./Chat.css";
import AddChatContainer from "./AddChatContainer";
import ChatCard from "./ChatCard";

function Chat() {
  const [chats, setChats] = useState([]);
  const [isChatsDesc, setIsChatsDesc] = useState();

  useEffect(() => {
    let storedChats = localStorage.getItem("chats") || [];
    if (storedChats.length > 0) {
      storedChats = JSON.parse(storedChats);
      setChats(storedChats);
      sortChats(true, storedChats);
    } else {
      localStorage.setItem("chats", "");
    }
  }, []);

  const addChat = ({ name, comment }) => {
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

  const sortChats = (isDesc, currChat = []) => {
    const tempChats = chats.length ? [...chats] : [...currChat];
    tempChats.forEach((chat) => {
      if (chat.replies) {
        if (isDesc) {
          chat.replies.sort(
            (a, b) => parseFloat(b.dateAndTime) - parseFloat(a.dateAndTime)
          );
        } else {
          chat.replies.sort(
            (a, b) => parseFloat(a.dateAndTime) - parseFloat(b.dateAndTime)
          );
        }
      }
    });
    if (isDesc) {
      tempChats.sort(
        (a, b) => parseFloat(b.dateAndTime) - parseFloat(a.dateAndTime)
      );
    } else {
      tempChats.sort(
        (a, b) => parseFloat(a.dateAndTime) - parseFloat(b.dateAndTime)
      );
    }
    setChats(tempChats);
    setIsChatsDesc(!isChatsDesc);
  };

  return (
    <div>
      <AddChatContainer title="Comment" onSubmit={addChat} />
      {chats.length > 0 && (
        <div className="sortChats" onClick={() => sortChats(!isChatsDesc)}>
          Sort by Date & Time ↓↑
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
