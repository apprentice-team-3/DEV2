import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setTodo } from './actions';
import './index.css';

function Header({ setTodo }) {
  const [yesterdayTasks, setYesterdayTasks] = useState(
    localStorage.getItem('yesterday')
      ? JSON.parse(localStorage.getItem('yesterday'))
      : []
  );

  useEffect(() => {
    if (!localStorage.getItem('yesterday')) {
      const testTasks = ['タスク1', 'タスク2', 'タスク3'];
      localStorage.setItem('yesterday', JSON.stringify(testTasks));
      setYesterdayTasks(testTasks);
    }
  }, []);

  const handleClick = (task) => {
    setTodo(task);
  };

  return (
    <header className='header'>
      <h1 className='header-title'>にっぽーくん</h1>
      <nav className='header-nav'>
        <ul>
          <li>昨日立てた予定</li>
          {yesterdayTasks.length > 0 ? (
            <ul>
              {yesterdayTasks.map((task, index) => (
                <li key={index} onClick={() => handleClick(task)}>
                  {task}
                </li>
              ))}
            </ul>
          ) : (
            <li>昨日のタスクがありません</li>
          )}
        </ul>
      </nav>
    </header>
  );
}

const mapDispatchToProps = {
  setTodo,
};

export default connect(null, mapDispatchToProps)(Header);
