import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useDispatch } from "react-redux";
import { write } from "../../../../redux/store/modules/pdcaList";

export default function Editor({
  order = "PDCA",
  setMarkdown,
  initialData = [{}],
}) {
  const dispatch = useDispatch();

  const editor = useCreateBlockNote({
    initialContent: initialData,
    dictionary: locales.ja,
  });

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);

    switch (order) {
      case "Plan":
        dispatch(write({ plan: markdown, planBlock: editor.document }));
        break;
      case "Do":
        dispatch(write({ do: markdown, doBlock: editor.document }));
        break;
      case "Check":
        dispatch(write({ check: markdown, checkBlock: editor.document }));
        break;
      case "Action":
        dispatch(write({ action: markdown, actionBlock: editor.document }));
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
