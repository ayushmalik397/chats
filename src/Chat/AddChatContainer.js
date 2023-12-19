import React, { useState } from "react";
import "./Chat.css";

function AddChatContainer(props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const addChat = () => {
    if (name && comment) {
      props.onSubmit({ name, comment });
      setName("");
      setComment("");
    } else {
      setError("*Both Name & Comment are mandatory to add");
    }
  };

  return (
    <>
      <div className="addChatContainer">
        <div>{props.title}</div>
        <input
          type="string"
          height="20px"
          className="input"
          style={{ heigt: "20px" }}
          placeholder="Name*"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
        <textarea
          rows="4"
          cols="50"
          className="input"
          placeholder="Comment*"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError("");
          }}
        />
        <div>
          <button className="submitBtn" onClick={addChat}>
            POST
          </button>
          <div className="errorMsg">{error}</div>
        </div>
      </div>
    </>
  );
}

export default AddChatContainer;
