import { marked } from "marked";
import React, { useState } from "react";
import sanitizeHtml from "sanitize-html";
import "./index.css";

export default function Single({ title, placeholder }) {
  const [markdown, setMarkdown] = useState("");
  const [showFeedback, setShowFeedBack] = useState("");
  const markedText = sanitizeHtml(markdown, {
    allowedTags: [],
    disallowedTagsMode: "recursiveEscape",
  });

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlText = marked.parse(markedText);

  return (
    <div>
      <h2 className="single__title">{title}</h2>
      <div className="single__textarea__wrapper">
        <div className="single__textarea__block"></div>
        <textarea
          className="single__textarea"
          placeholder={placeholder}
          onChange={(e) => {
            setMarkdown(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="single__preview">
        <p>プレビュー</p>
        <div className="">
          <div dangerouslySetInnerHTML={{ __html: htmlText }} />
        </div>
      </div>
      <button className="single__button" onClick={() => setShowFeedBack(true)}>
        フィードバックを取得する
      </button>
      {showFeedback && <div className="single__feedback">feed-back</div>}
    </div>
  );
}
