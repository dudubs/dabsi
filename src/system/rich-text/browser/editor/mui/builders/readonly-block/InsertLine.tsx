import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import { withHooks } from "@dabsi/view/react/utils/withHooks";
import { makeStyles } from "@material-ui/core";

export const MuiInsertLineAfter = withHooks({
  classes: makeStyles(
    theme => ({
      content: { position: "relative" },
      insert: {
        cursor: "text",
        height: 0,
        "&:before": {
          // background: "red",
          // opacity: "0.9",
          content: '" "',
          display: "block",
          position: "relative",
          height: 10,
          bottom: 10,
        },
        "&:hover": {
          height: 30,
        },
      },
    }),
    {
      name: "rt",
    }
  ),
})(
  (
    {
      children,
      store,
      editor,
      block,
    }: {
      children: React.ReactElement;
      store: RichTextStore;
      editor: RichTextEditor;
      block: Draft.ContentBlock;
    },
    { classes }
  ) => {
    const nextBlockType = store.content.getBlockAfter(block.key)?.type;

    const nextBlockIsEditableBlock =
      nextBlockType && editor.isEditableBlock(nextBlockType);

    const showInsertBlock = !nextBlockIsEditableBlock || !nextBlockType;

    if (!showInsertBlock) return children;

    return (
      <>
        <div className={classes.content}>{children}</div>
        <div
          className={classes.insert}
          onClick={() => {
            store
              .select({
                anchorKey: block.key,
                endOfAnchor: true,
              })
              .insertBlocks([{ text: "" }]);
          }}
        />
      </>
    );
  }
);
