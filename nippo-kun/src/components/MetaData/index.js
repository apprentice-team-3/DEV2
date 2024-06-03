import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodo, updateTask } from '../../todoSlice';
import './index.css';

function MetaData() {
    const { selectedTask, tasks } = useSelector((state) => state.todor);
    const dispatch = useDispatch();

    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${month}/${day}`;
    });

    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return today.getMonth() + 1;
    });

    const [selectedDay, setSelectedDay] = useState(() => {
        const today = new Date();
        return today.getDate();
    });

    const [selectedHour, setSelectedHour] = useState(() => {
        const savedHour = localStorage.getItem('defaultStudyHour');
        return savedHour !== null ? Number(savedHour) : 10;
    });

    const [selectedMind, setSelectedMind] = useState(() => {
        const savedMind = localStorage.getItem('defaultTodayMind');
        return savedMind !== null ? String(savedMind) : 'Good';
    });

    const [dayOfWeek, setDayOfWeek] = useState(() => {
        const today = new Date();
        return today.toLocaleDateString('ja-JP', { weekday: 'short' });
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(selectedTask);

    const updateDayOfWeek = (month, day) => {
        const year = new Date().getFullYear();
        const date = new Date(year, month - 1, day);
        const weekday = date.toLocaleDateString('ja-JP', { weekday: 'short' });
        setDayOfWeek(weekday);
    };

    const handleDateChange = (month, day) => {
        setCurrentDate(`${month}/${day}`);
        setSelectedMonth(month);
        setSelectedDay(day);
        updateDayOfWeek(month, day);
    };

    const handleMonthChange = (e) => {
        const newMonth = e.target.value;
        handleDateChange(newMonth, selectedDay);
    };

    const handleDayChange = (e) => {
        const newDay = e.target.value;
        handleDateChange(selectedMonth, newDay);
    };

    const handleHourChange = (e) => {
        const newHour = e.target.value;
        setSelectedHour(newHour);
        localStorage.setItem('defaultStudyHour', newHour);
    };

    const handleMindChange = (e) => {
        const newMind = e.target.value;
        setSelectedMind(newMind);
        localStorage.setItem('defaultTodayMind', newMind);
    };

    const handlePreviousDay = () => {
        const year = new Date().getFullYear();
        let date = new Date(year, selectedMonth - 1, selectedDay);
        date.setDate(date.getDate() - 1);

        const newMonth = date.getMonth() + 1;
        const newDay = date.getDate();

        handleDateChange(newMonth, newDay);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditValue(selectedTask);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEditComplete = () => {
        const taskIndex = tasks.findIndex(task => task === selectedTask);
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = editValue;
        localStorage.setItem('yesterday', JSON.stringify(updatedTasks));

        dispatch(updateTask({ index: taskIndex, newTask: editValue }));

        setIsEditing(false);
    };

    return (
        <>
            <div className='MetaData'>
                <div className='date'>
                    <div>日付:</div>
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        {[...Array(12).keys()].map((m) => (
                            <option key={m + 1} value={m + 1}>{m + 1}</option>
                        ))}
                    </select>
                    <select value={selectedDay} onChange={handleDayChange}>
                        {[...Array(31).keys()].map((d) => (
                            <option key={d + 1} value={d + 1}>{d + 1}</option>
                        ))}
                    </select>
                    <div>{currentDate}({dayOfWeek})</div>
                    <button onClick={handlePreviousDay}>前日に切り替える</button>
                </div>
                <div className='time'>
                    <div>学習時間</div>
                    <select value={selectedHour} onChange={handleHourChange}>
                        {[...Array(25).keys()].map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <div className='timeUnit'>h</div>
                </div>
                <div className='mind'>
                    <div>今日の気持ち</div>
                    <select className='selectedMind' value={selectedMind} onChange={handleMindChange}>
                        {['とても良い', '良い', '普通', '悪い', 'とても悪い'].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='ToDo'>
                {isEditing ? (
                    <>
                        <textarea value={editValue} onChange={handleEditChange} />
                        <button onClick={handleEditComplete}>完了</button>
                    </>
                ) : (
                    <>
                        {selectedTask}
                        <button onClick={handleEditClick}>編集</button>
                    </>
                )}
            </div>
        </>
    );
}

export default MetaData;
