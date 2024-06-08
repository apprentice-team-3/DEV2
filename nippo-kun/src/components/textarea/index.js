import { useState } from "react";
import { useSelector } from "react-redux";
import Editor from "../pdca/single/Editor";

export default function Textarea() {
  const [markdown, setMarkdown] = useState("");
  const date = useSelector((state) => state.metaDater.metaData.date);
  const learningTime = useSelector(
    (state) => state.metaDater.metaData.learningTime
  );
  const mind = useSelector((state) => state.metaDater.metaData.mind);
  const pdcaList = useSelector((state) => state.pdcaLister.pdcaList);

  const distContent = [];

  distContent.push(
    {
      type: "heading",
      props: {
        level: 2,
      },
      content: `${date}`,
    },
    {
      type: "paragraph",
      props: {
        level: 1,
      },
      content: `学習時間:${learningTime}時間    今日の気持ち: ${mind}`,
    }
  );

  console.log(pdcaList);

  if (pdcaList.length > 0) {
    distContent.push({
      type: "heading",
      props: {
        level: 2,
      },
      content: "Done List",
    });
    for (const pdca of pdcaList) {
      if (!pdca.doneName) {
        continue;
      }
      distContent.push({
        type: "bulletListItem",
        content: pdca.doneName,
      });
    }
  }

  for (const pdca of pdcaList) {
    if (!pdca.doneName) {
      continue;
    }
    distContent.push({
      type: "heading",
      props: {
        level: 2,
      },
      content: pdca.doneName,
    });

    if (pdca.planBlock) {
      distContent.push({
        type: "heading",
        props: {
          level: 3,
        },
        content: "Plan",
      });

      for (let i = 0; i < pdca.planBlock.length; i++) {
        distContent.push(pdca.planBlock[i]);
      }
    }

    if (pdca.doBlock) {
      distContent.push({
        type: "heading",
        props: {
          level: 3,
        },
        content: "Do",
      });

      for (let i = 0; i < pdca.doBlock.length; i++) {
        distContent.push(pdca.doBlock[i]);
      }
    }

    if (pdca.checkBlock) {
      distContent.push({
        type: "heading",
        props: {
          level: 3,
        },
        content: "Check",
      });

      for (let i = 0; i < pdca.checkBlock.length; i++) {
        distContent.push(pdca.checkBlock[i]);
      }
    }

    if (pdca.actionBlock) {
      distContent.push({
        type: "heading",
        props: {
          level: 3,
        },
        content: "Action",
      });

      for (let i = 0; i < pdca.actionBlock.length; i++) {
        distContent.push(pdca.actionBlock[i]);
      }
    }
  }

  return (
    <div>
      <Editor
        setMarkdown={setMarkdown}
        initialData={distContent.length ? distContent : [{}]}
      />
    </div>
  );
}
