import React, { useState } from "react";
import "./Chat.css";
import AddChatContainer from "./AddChatContainer";

function ChatCard(props) {
  const [isReplyEnable, setIsReplyEnable] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [comment, setComment] = useState(props.chat.comment);
  const { chat, isReply } = props;

  const addReply = ({ name, comment, time }) => {
    setIsReplyEnable(false);
    props.replyChat({ name, comment, time, chatIdx: props.chatIdx });
  };

  const getTime = () => {
    var d = new Date(chat.dateAndTime);
    return d.toDateString();
  };

  return (
    <>
      <div className={`chatCard ${isReply ? "reply" : ""}`}>
        <div className="chatContent">
          <div>
            <strong>{chat.name}</strong>
          </div>
          <div>
            {isEditEnabled ? (
              <textarea
                rows="4"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            ) : (
              chat.comment
            )}
          </div>
          <div className="actionsBtn">
            {!isReply && (
              <span onClick={() => setIsReplyEnable(!isReplyEnable)}>
                Reply
              </span>
            )}
            {isEditEnabled ? (
              <span
                onClick={() => {
                  props.updateComment(
                    props.chatIdx,
                    isReply,
                    comment,
                    props.replyIdx || 0
                  );
                  setIsEditEnabled(false);
                }}
              >
                Save
              </span>
            ) : (
              <span onClick={() => setIsEditEnabled(true)}>Edit</span>
            )}
          </div>
        </div>
        <div>{getTime()}</div>
        <div
          className="chatDelete"
          onClick={() =>
            props.chatDelete(props.chatIdx, isReply, props.replyIdx || 0)
          }
        >
          D
        </div>
      </div>
      {isReplyEnable && <AddChatContainer title="Reply" onSubmit={addReply} />}
    </>
  );
}

export default ChatCard;
