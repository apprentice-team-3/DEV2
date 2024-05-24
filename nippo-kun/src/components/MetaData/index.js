import React, { useState } from 'react';
import './index.css';

function MetaData() {
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
        return savedMind !== null ? Number(savedMind) : 5;
    });

    const handleDateChange = (month, day) => {
        setCurrentDate(`${month}/${day}`);
        setSelectedMonth(month);
        setSelectedDay(day);
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

    return (
        <>
            <div className='MetaData'>
                <div className='date'>
                    <div>本日の日付:</div>
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
                    <div>{currentDate}</div>
                </div>
                <div className='time'>
                    <div>学習時間</div>
                    <select value={selectedHour} onChange={handleHourChange}>
                        {[...Array(25).keys()].map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                </div>
                <div className='mind'>
                    <div>今日の気持ち（1:Bad 5:Good）</div>
                    <select value={selectedMind} onChange={handleMindChange}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                <div className='ToDo'>AtCoder</div>
            </div>
        </>
    );
}

export default MetaData;
