import React, { useState, useEffect } from 'react';
import './index.css';


function Header() {
  const [yesterdayTasks, setYesterdayTasks] = useState(
    localStorage.getItem("yesterday")
      ? JSON.parse(localStorage.getItem("yesterday"))
      : []
  );

  useEffect(() => {
    //初めてアプリを使用する場合にテストデータを設定
    if (!localStorage.getItem("yesterday")) {
      const testTasks = ["タスク1", "タスク2", "タスク3"];
      localStorage.setItem("yesterday", JSON.stringify(testTasks));
      setYesterdayTasks(testTasks);
    }
  }, []);

  return(
    <header className="header">
      <h1 className="header-title">にっぽーくん</h1>
      <nav className="header-nav">
        <ul>
          <li>昨日立てた予定</li>
          {yesterdayTasks.length > 0 ? (
            <ul>
              {yesterdayTasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <li>昨日のタスクがありません</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

// const Header = (props) => {
//
// const [todos, setTodos] = useState(["todo1", 'todo2']);
//   return (
//     <>
//     <TodoList todos={todos} />
//     </>
//   );

export default Header;
