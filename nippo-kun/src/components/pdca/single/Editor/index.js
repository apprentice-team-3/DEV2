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

  console.log(initialData);

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);

    switch (order) {
      case "Plan":
        dispatch(write({ plan: markdown }));
        break;
      case "Do":
        dispatch(write({ do: markdown }));
        break;
      case "Check":
        dispatch(write({ check: markdown }));
        break;
      case "Action":
        dispatch(write({ action: markdown }));
        break;
      case "Confirm":
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
