import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import useStore from "../../../../zustand/store";

export default function Editor({
  order = "PDCA",
  setMarkdown,
  initialData = [{}],
}) {
  const write = useStore((state) => state.write);

  const editor = useCreateBlockNote({
    initialContent: initialData,
    dictionary: locales.ja,
  });

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);

    switch (order) {
      case "Plan":
        write({ plan: markdown, planBlock: editor.document });
        break;
      case "Do":
        write({ do: markdown, doBlock: editor.document });
        break;
      case "Check":
        write({ check: markdown, checkBlock: editor.document });
        break;
      case "Action":
        write({ action: markdown, actionBlock: editor.document });
        break;
      default:
        break;
    }
  };

  return (
    <BlockNoteView
      editor={editor}
      onChange={onChange}
      sideMenu={false}
      slashMenu={true}
      linkToolbar={false}
      data-theming-css
    />
  );
}
