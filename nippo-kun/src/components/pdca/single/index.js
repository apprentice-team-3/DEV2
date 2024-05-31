import { marked } from "marked";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sanitizeHtml from "sanitize-html";
import { write } from "../../../redux/store/modules/pdcaList";
import "./index.css";

export default function Single({ title, placeholder, order = "PDCA" }) {
  const [markdown, setMarkdown] = useState("");
  const [showFeedback, setShowFeedBack] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const dispatch = useDispatch();

  const pdcaList = useSelector((state) => state.pdcaLister.pdcaList);

  console.log(pdcaList);

  const markedText = sanitizeHtml(markdown, {
    allowedTags: [],
    disallowedTagsMode: "recursiveEscape",
  });

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlText = marked.parse(markedText);

  const onChange = (e) => {
    setMarkdown(e.target.value);
    switch (order) {
      case "Plan":
        dispatch(write({ plan: e.target.value }));
        break;
      case "Do":
        dispatch(write({ do: e.target.value }));
        break;
      case "Check":
        dispatch(write({ check: e.target.value }));
        break;
      case "Action":
        dispatch(write({ action: e.target.value }));
        break;
      default:
        break;
    }
  };

  const onClick = async () => {
    setShowFeedBack(true);
    setFeedbackText("AIが生成中です...");

    const response = await fetch(process.env.REACT_APP_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: markdown,
        order,
      }),
    });

    if (response.ok) {
      response.json().then((data) => {
        const { generatedText } = data;
        setFeedbackText(marked.parse(generatedText));
      });
    } else {
      setFeedbackText("エラーが発生しました");
    }
  };

  return (
    <div>
      <h2 className="single__title">{title}</h2>
      <div className="single__textarea__wrapper">
        <div className="single__textarea__block"></div>
        <textarea
          className="single__textarea"
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="single__preview">
        <p>プレビュー</p>
        <div className="">
          <div dangerouslySetInnerHTML={{ __html: htmlText }} />
        </div>
      </div>
      <button className="single__button" onClick={onClick}>
        フィードバックを取得する
      </button>
      {showFeedback && (
        <div
          className="single__feedback"
          dangerouslySetInnerHTML={{ __html: feedbackText }}
        ></div>
      )}
    </div>
  );
}
