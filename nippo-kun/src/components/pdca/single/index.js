import React, { useState } from "react";
import "./index.css";

export default function Single({ title, placeholder }) {
  const [showFeedback, setShowFeedBack] = useState(false);
  const [content, setContent] = useState("");
  const [markdownList, setMarkdownList] = useState([]);

  return (
    <div>
      <h2 className="single__title">{title}</h2>
      <div className="single__textarea__wrapper">
        <div className="single__textarea__block"></div>
        <textarea
          className="single__textarea"
          placeholder={placeholder}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setMarkdownList([...markdownList, e.target.value]);
              setContent("");
            }
          }}
          defaultValue={content}
        ></textarea>
      </div>
      <button className="single__button" onClick={() => setShowFeedBack(true)}>
        フィードバックを取得する
      </button>
      {showFeedback && <div className="single__feedback">feed-back</div>}
    </div>
  );
}
