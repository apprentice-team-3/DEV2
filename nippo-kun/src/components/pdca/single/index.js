import React, { useState } from "react";
import "./index.css";

export default function Single({ title, placeholder }) {
  const [showFeedback, setShowFeedBack] = useState(false);
  const [content, setContent] = useState("");

  return (
    <div>
      <h2 className="single__title">{title}</h2>
      <textarea
        className="single__textarea"
        placeholder={placeholder}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      >
        {content}
      </textarea>
      <button className="single__button" onClick={() => setShowFeedBack(true)}>
        フィードバックを取得する
      </button>
      {showFeedback && <div className="single__feedback">feed-back</div>}
    </div>
  );
}
