import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import classnames from "classnames";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import useStore from "../../../zustand/store";
import Loading from "../../loading";
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
  const state = useStore();
  const [pdcaList, setPdcaList] = useState();

  const [markdown, setMarkdown] = useState("");
  const [showFeedback, setShowFeedBack] = useState("");
  const [commonFeedbackText, setCommonFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addFeedbackText, setAddFeedbackText] = useState("");
  const [isTruncated, setIsTruncated] = useState(false);

  const editor = useCreateBlockNote({
    initialContent: [{}],
    dictionary: locales.ja,
  });

  const onChange = async ({ editor, order }) => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);

    switch (order) {
      case "Plan":
        state.write({
          plan: markdown,
          planBlock: editor.document,
          editorPlan: editor,
        });
        break;
      case "Do":
        state.write({
          do: markdown,
          doBlock: editor.document,
          editorDo: editor,
        });
        break;
      case "Check":
        state.write({
          check: markdown,
          checkBlock: editor.document,
          editorCheck: editor,
        });
        break;
      case "Action":
        state.write({
          action: markdown,
          actionBlock: editor.document,
          editorAction: editor,
        });
        break;
      default:
        break;
    }
  };

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const onFeedbackClick = async (order) => {
    setShowFeedBack(true);
    setIsLoading(true);
    setCommonFeedbackText("AIがフィードバックを生成中です...");

    try {
      const response = await fetch(
        "https://express-hello-world-a3nc.onrender.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: markdown,
            order,
          }),
        }
      );

      if (response.ok) {
        response.json().then((data) => {
          const { generatedText } = data;
          setIsTruncated(false);
          setIsLoading(false);

          if (generatedText.length > 128) {
            setCommonFeedbackText(marked.parse(generatedText.slice(0, 128)));
            setAddFeedbackText(marked.parse(generatedText.slice(128)));

            setIsTruncated(true);
          } else {
            setCommonFeedbackText(marked.parse(generatedText));
          }
        });
      } else {
        setIsTruncated(false);
        setIsLoading(false);
        setCommonFeedbackText(
          marked.parse(
            "エラーが発生しました\nしばらく時間を置いてから実行してください"
          )
        );
      }
    } catch (e) {
      setIsTruncated(false);
      setIsLoading(false);
      setCommonFeedbackText(
        marked.parse(
          "エラーが発生しました\nしばらく時間を置いてから実行してください"
        )
      );
      console.error(e);
    }
  };

  const onFeedbackTextClick = (e) => {
    e.preventDefault();

    if (isTruncated) {
      setIsTruncated(false);
      const $dom = document.querySelector(".single__feedback__wrapper");
      $dom.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsTruncated(true);
    }
  };

  const singleFeedbackClassNames = {
    single__feedback__body: true,
    truncate: isTruncated,
  };

  useEffect(() => {
    for (let i = 0; i < tabs.length; i++) {
      state.add &&
        state.add({
          doneName: tabs[i],
          editorPlan: editor,
          editorDo: editor,
          editorCheck: editor,
          editorAction: editor,
        });
    }
    state.change && state.change({ doneName: tabs[0] });
    setPdcaList(state.show().pdcaList);
  }, [tabs]);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handleTabClick = (tabName) => {
    setActiveTab((prev) => tabName);
    onTabChange((prev) => tabName);
    state.change && state.change({ doneName: tabName });
    setPdcaList(state.show().pdcaList);
    console.log(state.show().pdcaList);
  };

  return (
    <>
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
      <div>
        {pdcaList && (
          <>
            {pdcaList.map((item) => (
              <div key={item.doneName}>
                {item.isOpen && (
                  <section className="single__wrapper">
                    <div>
                      <h2 className="single__title">{"Plan"}</h2>
                      <div className="single__textarea__wrapper">
                        <BlockNoteView
                          editor={item.editorPlan}
                          onChange={() =>
                            onChange({ editor: item.editorPlan, order: "Plan" })
                          }
                          sideMenu={false}
                          slashMenu={true}
                          linkToolbar={false}
                          data-theming-css
                        />
                      </div>
                      <button
                        className={"single__button"}
                        onClick={onFeedbackClick}
                      >
                        フィードバックを取得する
                      </button>
                      {isLoading && <Loading />}
                      {showFeedback && !isLoading && (
                        <div
                          className="single__feedback__wrapper"
                          onClick={onFeedbackTextClick}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: commonFeedbackText,
                            }}
                          ></div>
                          {isTruncated && !isLoading && (
                            <div className="single__feedback__more">
                              続きを読むにはクリック
                            </div>
                          )}
                          <div className={classnames(singleFeedbackClassNames)}>
                            <div
                              className={"single__feedback hidden"}
                              dangerouslySetInnerHTML={{
                                __html: addFeedbackText,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Tabs;
