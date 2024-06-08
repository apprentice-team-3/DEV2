import { useState } from "react";
import { useSelector } from "react-redux";
import Editor from "../pdca/single/Editor";

export default function Textarea() {
  const [markdown, setMarkdown] = useState("");

  const pdcaList = useSelector((state) => state.pdcaLister.pdcaList);

  const distContent = [];

  if (pdcaList[0].planBlock) {
    distContent.push({
      type: "heading",
      props: {
        level: 2,
      },
      content: "Plan",
    });

    for (let i = 0; i < pdcaList[0].planBlock.length; i++) {
      distContent.push(pdcaList[0].planBlock[i]);
    }
  }

  if (pdcaList[0].doBlock) {
    distContent.push({
      type: "heading",
      props: {
        level: 2,
      },
      content: "Do",
    });

    for (let i = 0; i < pdcaList[0].doBlock.length; i++) {
      distContent.push(pdcaList[0].doBlock[i]);
    }
  }

  if (pdcaList[0].checkBlock) {
    distContent.push({
      type: "heading",
      props: {
        level: 2,
      },
      content: "Check",
    });

    for (let i = 0; i < pdcaList[0].checkBlock.length; i++) {
      distContent.push(pdcaList[0].checkBlock[i]);
    }
  }

  if (pdcaList[0].actionBlock) {
    distContent.push({
      type: "heading",
      props: {
        level: 2,
      },
      content: "Action",
    });

    for (let i = 0; i < pdcaList[0].actionBlock.length; i++) {
      distContent.push(pdcaList[0].actionBlock[i]);
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
