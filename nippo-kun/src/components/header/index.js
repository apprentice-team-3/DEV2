import React, { useState } from 'react';
import './index.css';
import TodoList from './TodoList';



function Header() {
  const [yesterdayTasks, setYesterdayTasks] = useState(
    localStorage.getItem("yesterday")
      ? JSON.parse(localStorage.getItem("yesterday"))
      : []
  );

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
