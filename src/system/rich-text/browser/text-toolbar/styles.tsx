// list (numberic, dot)
// header
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { EditorBlock, Modifier, SelectionState } from "draft-js";

const maxDepth = 10;

const useStyles = makeStyles(
  theme => ({
    "block-unstyled": theme.typography.body1,
    "block-h1": theme.typography.h1,
    "block-h2": theme.typography.h2,
    "block-h3": theme.typography.h3,
    "block-h4": theme.typography.h4,
    "block-h5": theme.typography.h6,
    "block-h6": theme.typography.h6,

    "block-ordered-list-item": {
      ...theme.typography.body1,
      "& ol": { padding: 0, margin: 0 },
      listStyleType: "none",
      "&>div": { display: "inline-block" },
    },
    "block-unordered-list-item": {
      ...theme.typography.body1,
      "& ol": { padding: 0, margin: 0 },
      listStyleType: "disc",
      "&>div": { display: "inline-block" },
    },
    ...(Array(maxDepth + 1)
      .toSeq()
      .map((_, i) => [
        "depth-" + i,
        {
          "&$direction-RTL": {
            marginRight: 15 * i,
          },
          "&$direction-LTR": {
            marginLeft: 15 * i,
          },
          "&$block-ordered-list-item": {
            "&:before": {
              content: `counter(ol${i}) ". "`,
              counterIncrement: "ol" + i,
            },
          },
          "&.public-DraftStyleDefault-reset": {
            counterReset: "ol" + i,
          },
        },
      ])
      .fromEntrySeq()
      .toObject() as {}),
    "align-LEFT": {
      textAlign: "left !important" as any,
    },
    "align-CENTER": {
      textAlign: "center !important" as any,
    },
    "align-RIGHT": {
      textAlign: "right !important" as any,
    },
    "direction-RTL": {
      direction: "rtl",
      textAlign: "right",
    },
    "direction-LTR": {
      direction: "ltr",
      textAlign: "left",
    },
  }),
  {
    name: "rte",
  }
);

RichTextEditorPlugins.push(editor => {
  const {
    store,
    editorProps: { blockStyleFn, handleKeyCommand },
  } = editor;
  const classes = editor.useHook(useStyles);
  editor.handleKeyCommandMap["split-block"] = () => {
    const { startBlock } = store;
    let content = store.modifierCall("splitBlock", store.selection);
    content = Modifier.setBlockData(
      content,
      SelectionState.createEmpty(content.getKeyAfter(startBlock.getKey())),
      startBlock.getData()
    );
    store.update("push", content, "split-block");
    store.update("forceSelection", store.selection);

    return "handled";
  };
  editor.editorProps.blockStyleFn = block => {
    const direction = block.getData().get("direction") || "LTR";
    return clsx(
      classes["align-" + block.getData().get("align")],
      classes["direction-" + direction],
      classes["depth-" + block.getDepth()],
      classes["block-" + block.getType()], //
      blockStyleFn?.(block)
    );
  };
});
