import React, { useEffect, useState } from "react";
import useStore from "../../../zustand/store";
import "./index.css";

const Tabs = ({
  tabs,
  currentTab,
  onTabChange,
  handleAddTab,
  handleRemoveTab,
  handleEditTab,
}) => {
  const [activeTab, setActiveTab] = useState(currentTab);
  const change = useStore((state) => state.change);
  const pdcaList = useStore((state) => state.pdcaList);
  const state = useStore();

  useEffect(() => {
    for (let i = 0; i < tabs.length; i++) {
      state.add && state.add({ doneName: tabs[i] });
    }
  }, [tabs]);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handleTabClick = (tabName) => {
    setActiveTab((prev) => tabName);
    onTabChange((prev) => tabName);
    state.change && state.change({ doneName: tabName });
  };

  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab-button ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
      <button className="tab-button add-tab" onClick={handleAddTab}>
        +
      </button>
      {activeTab && (
        <>
          <div className="task-controls">
            <button onClick={handleEditTab}>編集</button>
            <button onClick={() => handleRemoveTab(activeTab)}>削除</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Tabs;
