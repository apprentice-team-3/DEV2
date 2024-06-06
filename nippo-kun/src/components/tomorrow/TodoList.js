import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { removeTodo, updateTodo } from "../../todoSlice";
import "./index.css";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.tomorrow);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(null);
  const [editContent, setEditContent] = useState("");
  const textareaRef = useRef(null);

  const handleRemoveTextarea = (index) => {
    dispatch(removeTodo(index));
  };

  const handleEditTodo  = (index) => {
    setEditIndex(index);
    setEditContent(todos[index]);
  };

  const handleSaveTodo = (index) => {
    dispatch(updateTodo({
      index,
      content: editContent
    }));
    setEditIndex(null);
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

  useEffect(() => {
      const textarea  = textareaRef.current;
      const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.isComposing) {
          if (event.metaKey) {
            event.preventDefault();
            handleSaveTodo(editIndex);
          }
        }
      };

      if (textarea) {
        textarea.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (textarea) {
          textarea.removeEventListener("keydown", handleKeyDown);
        }
      };
    }, [editIndex, editContent]);

  return (
    <div>
      <h2 className="title">明日やることリスト</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <button
            className="button remove"
            onClick={() => handleRemoveTextarea(index)}
          >
            ー
            </button>
            {editIndex === index ? (
              <div className="edit-container">
                <textarea
                  ref={textareaRef}
                  className="textarea"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
                <button
                  className="button save"
                  onClick={() => handleSaveTodo(index)}
                >
                  保存
                </button>
              </div>
            ) : (
              <div
              className="textarea-block"
              onClick={() => handleEditTodo(index)}
              dangerouslySetInnerHTML={{__html: getSanitizedMarkdown(todo) }}
              ></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;