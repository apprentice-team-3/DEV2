import React, { useState, useEffect } from 'react';
import './index.css';

function MetaData() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('ja-JP', {
            month: 'numeric',
            day: 'numeric'
        });
        setCurrentDate(formattedDate);
    }, []);

    return (
        <>
            <div className='MetaData'>
                <div className='date'>
                    <div>本日の日付:</div>
                    <div className='currentDate'>{currentDate}</div>
                </div>
                <div className='time'>
                    <div>学習時間</div>
                    <select>
                        {[...Array(25).keys()].map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                </div>
                <div className='mind'>
                    <div>今日の気持ち</div>
                    <select>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                {/* 選択された"明日の予定"を表示する */}
                <div className='ToDo'>AtCoder</div>
            </div>
        </>
    );
}

export default MetaData;
