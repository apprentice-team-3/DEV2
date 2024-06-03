import React from "react";
import { useSelector } from "react-redux";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.tomorrow);

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
          <li key={index}>
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
