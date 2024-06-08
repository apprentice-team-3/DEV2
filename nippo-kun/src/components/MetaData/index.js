import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodayTask } from "../../todaySlice";
import "./index.css";
import Tabs from "./tab/index";

function MetaData() {
  const todayTasks = useSelector((state) => state.today.today);
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("");
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const storedTabs = localStorage.getItem("yesterday")
      ? JSON.parse(localStorage.getItem("yesterday"))
      : [];
    setTabs(storedTabs);
    if (storedTabs.length > 0) {
      setCurrentTab(storedTabs[0]);
    }
  }, []);

  const handleTabChange = (tabName) => {
    setCurrentTab((prev) => tabName);
  };

  const handleUpdateTask = (index, content) => {
    dispatch(updateTodayTask({ index, content }));
    const updatedTabs = tabs.map((tab, i) => (i === index ? content : tab));
    setTabs(updatedTabs);
  };

  const handleRemoveTab = (tabName) => {
    const updatedTabs = tabs.filter((tab) => tab !== tabName);
    setTabs(updatedTabs);
    if (currentTab === tabName && updatedTabs.length > 0) {
      setCurrentTab(updatedTabs[0]);
    } else if (updatedTabs.length === 0) {
      setCurrentTab("");
    }
  };

  const handleEditTab = () => {
    const newLabel = prompt("タスクを入力してください:", currentTab);
    if (newLabel) {
      handleUpdateTask(tabs.indexOf(currentTab), newLabel);
    }
    setCurrentTab(newLabel);
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
    localStorage.setItem("defaultStudyHour", newHour);
  };

  const handleMindChange = (e) => {
    const newMind = e.target.value;
    setSelectedMind(newMind);
    localStorage.setItem("defaultTodayMind", newMind);
  };

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
    const savedHour = localStorage.getItem("defaultStudyHour");
    return savedHour !== null ? Number(savedHour) : 10;
  });

  const [selectedMind, setSelectedMind] = useState(() => {
    const savedMind = localStorage.getItem("defaultTodayMind");
    return savedMind !== null ? String(savedMind) : "Good";
  });

  const [dayOfWeek, setDayOfWeek] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("ja-JP", { weekday: "short" });
  });

  const updateDayOfWeek = (month, day) => {
    const year = new Date().getFullYear();
    const date = new Date(year, month - 1, day);
    const weekday = date.toLocaleDateString("ja-JP", { weekday: "short" });
    setDayOfWeek(weekday);
  };

  return (
    <>
      <div className="MetaData">
        <div className="date">
          <div>日付:</div>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {[...Array(12).keys()].map((m) => (
              <option key={m + 1} value={m + 1}>
                {m + 1}
              </option>
            ))}
          </select>
          <select value={selectedDay} onChange={handleDayChange}>
            {[...Array(31).keys()].map((d) => (
              <option key={d + 1} value={d + 1}>
                {d + 1}
              </option>
            ))}
          </select>
          <div>
            {currentDate}({dayOfWeek})
          </div>
        </div>
        <div className="time">
          <div>学習時間</div>
          <select value={selectedHour} onChange={handleHourChange}>
            {[...Array(25).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <div className="timeUnit">h</div>
        </div>
        <div className="mind">
          <div>今日の気持ち</div>
          <select
            className="selectedMind"
            value={selectedMind}
            onChange={handleMindChange}
          >
            {["めちゃええ", "ええ", "まあまあ", "わるい", "めちゃわるい"].map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setTabs={setTabs}
        onTabChange={handleTabChange}
        handleRemoveTab={handleRemoveTab}
        handleEditTab={handleEditTab}
      />
    </>
  );
}

export default MetaData;
