import React, { useState, useEffect } from 'react';
import './index.css';

const Tabs = ({
    tabs,
    currentTab,
    onTabChange,
    handleAddTab,
    handleRemoveTab,
    handleEditTab
}) => {
    const [activeTab, setActiveTab] = useState(currentTab);

    useEffect(() => {
        setActiveTab(currentTab);
    }, [currentTab]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        onTabChange(tabName);
    };

    return (
        <div className="tabs">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </button>
            ))}
            <button className="tab-button add-tab" onClick={handleAddTab}>+</button>
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