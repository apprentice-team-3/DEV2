import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add, change } from "../../../redux/store/modules/pdcaList";
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
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  useEffect(() => {
    if (tabs.length > 0) {
      for (let i = 0; i < tabs.length; i++) {
        dispatch(add({ doneName: tabs[i] }));
      }
      dispatch(change({ doneName: tabs[0] }));
    }
  }, [tabs]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    onTabChange(tabName);
    dispatch(change({ doneName: tabName }));
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
