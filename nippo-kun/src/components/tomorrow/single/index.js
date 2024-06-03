import { marked } from "marked";
import React, { useState } from "react";
import sanitizeHtml from "sanitize-html";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from "../../../todoSlice";
import "./index.css";

export default function MultiTextarea({ title, placeholder }) {
  const [content, setContent] = useState("");
  const todos = useSelector((state) => state.todo.tomorrow);
  const dispatch = useDispatch();

  const handleAddTextarea = () => {
    if(content.trim()) {
      dispatch(addTodo(content));
      setContent("");
    }
  };

  const handleRemoveTextarea = (index) => {
    dispatch(removeTodo(index));
  };

  const getSanitizedMarkdown = (markdown) => {
    const markedText = sanitizeHtml(markdown, {
      allowedTags: [],
      disallowedTagsMode: "recursiveEscape",
    });

    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    return marked.parse(markedText);
  };

  return (
    <div>
      <h2 className="multi__title">{title}</h2>
      <div className="multi__textarea__wrapper">
        <textarea
          className="multi__textarea"
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="multi__button add" onClick={handleAddTextarea}>
          ＋
        </button>
      </div>
      <div className="multi__preview">
        <p>プレビュー</p>
        <div
          dangerouslySetInnerHTML={{ __html: getSanitizedMarkdown(content) }}
        />
      </div>
      {todos.map((text, index) => (
        <div key={index} className="multi__textarea__item">
          <div
            className="multi__textarea__block"
            dangerouslySetInnerHTML={{ __html: getSanitizedMarkdown(text) }}
          ></div>
          <button
            className="multi__button remove"
            onClick={() => handleRemoveTextarea(index)}
          >
            ー
          </button>
        </div>
      ))}
    </div>
  );
}
