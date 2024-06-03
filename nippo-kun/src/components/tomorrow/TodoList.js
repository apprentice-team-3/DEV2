import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { removeTodo } from "../../todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.tomorrow);
  const dispatch = useDispatch();

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
      <h2>明日やることリスト</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center"}}>
            <button
            className="multi__button remove"
            onClick={() => handleRemoveTextarea(index)}
          >
            ー
            </button>
            <div
              dangerouslySetInnerHTML={{__html: getSanitizedMarkdown(todo) }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
