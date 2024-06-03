import classnames from "classnames";
import { marked } from "marked";
import React, { useState } from "react";
import sanitizeHtml from "sanitize-html";
import "./index.css";

export default function Single({ title, placeholder, order = "PDCA" }) {
  const [markdown, setMarkdown] = useState("");
  const [showFeedback, setShowFeedBack] = useState("");
  const [commonFeedbackText, setCommonFeedbackText] = useState("");
  const [addFeedbackText, setAddFeedbackText] = useState("");

  const [isTruncated, setIsTruncated] = useState(false);
  const markedText = sanitizeHtml(markdown, {
    allowedTags: [],
    disallowedTagsMode: "recursiveEscape",
  });

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlText = marked.parse(markedText);

  const onFeedbackClick = async () => {
    setShowFeedBack(true);
    setCommonFeedbackText("AIがフィードバックを生成中です...");

    try {
      const response = await fetch(
        "https://express-hello-world-a3nc.onrender.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: markdown,
            order,
          }),
        }
      );

      if (response.ok) {
        response.json().then((data) => {
          const { generatedText } = data;
          setIsTruncated(false);

          if (generatedText.length > 128) {
            setCommonFeedbackText(marked.parse(generatedText.slice(0, 128)));
            setAddFeedbackText(marked.parse(generatedText.slice(128)));
            // const value = marked.parse(
            //   generatedText.slice(0, 128) + "...\n **続きを読むにはクリック**"
            // );
            setIsTruncated(true);
          } else {
            setCommonFeedbackText(marked.parse(generatedText));
          }
        });
      } else {
        setIsTruncated(false);
        setCommonFeedbackText(
          marked.parse(
            "エラーが発生しました\nしばらく時間を置いてから実行してください"
          )
        );
      }
    } catch (e) {
      setIsTruncated(false);
      setCommonFeedbackText(
        marked.parse(
          "エラーが発生しました\nしばらく時間を置いてから実行してください"
        )
      );
      console.error(e);
    }
  };

  const onFeedbackTextClick = (e) => {
    e.preventDefault();

    if (isTruncated) {
      setIsTruncated(false);
      const $dom = document.querySelector(".single__feedback__wrapper");
      $dom.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsTruncated(true);
    }
  };

  const singleFeedbackClassNames = {
    single__feedback__body: true,
    truncate: isTruncated,
  };

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
      <button className={"single__button"} onClick={onFeedbackClick}>
        フィードバックを取得する
      </button>
      {showFeedback && (
        <div
          className="single__feedback__wrapper"
          onClick={onFeedbackTextClick}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: commonFeedbackText,
            }}
          ></div>
          {isTruncated && (
            <div className="single__feedback__more">続きを読むにはクリック</div>
          )}
          <div className={classnames(singleFeedbackClassNames)}>
            <div
              className={"single__feedback hidden"}
              dangerouslySetInnerHTML={{
                __html: addFeedbackText,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
