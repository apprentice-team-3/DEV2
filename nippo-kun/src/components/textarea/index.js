import { useState } from "react";
import { useSelector } from "react-redux";
import Editor from "../pdca/single/Editor";

export default function Textarea() {
  const [markdown, setMarkdown] = useState("");

  const tomorrow = useSelector((state) => state.todo.tomorrow);

  return (
    <div>
      <Editor setMarkdown={setMarkdown} initialData={[{ tomorrow }]} />
    </div>
  );
}
