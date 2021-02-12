import withStyles from "@dabsi/browser/mui/withStyles";
import { MuiFocusableBox } from "@dabsi/system/rich-text/browser/MuiFocusableBox";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import clsx from "clsx";
import { SelectionState } from "draft-js";
import React from "react";
import { makeFoucsableBorder } from "./makeFoucsableBorder";

export const MuiAtomicBlockWrapper = withStyles(
  theme => ({
    root: {
      "&>#insert": {
        // background: "pink",
        cursor: "text",
        height: 0,
      },
      "&>#insert:before": {
        // background: "red",
        // opacity: "0.9",
        content: '" "',
        display: "block",
        position: "relative",
        height: 10,
        bottom: 10,
      },
      "&>#insert:hover": {
        height: 30,
      },
      "&>#content": {
        position: "relative",
      },
      ///

      // ".rt-atomic-test &>#content": {
      //   padding: 50,
      // },
    },
    focused: {
      // ".rt-focused &>#content:after": makeFoucsableBorder({
      //   color: theme.palette.primary.main,
      //   theme,
      //   width: 2,
      // }),
    },
    blured: {
      // ".rt-focused &>#content:hover:after": makeFoucsableBorder({
      //   color: theme.palette.grey[800],
      //   theme,
      //   width: 1,
      // }),
    },
  }),
  {
    name: "rt-atomic-block-wrapper",
  }
)<{ children; wrapperProps; store: RichTextStore; editor: RichTextEditor }>(
  (
    { children, editor, store, wrapperProps: { block, contentState } },
    classes
  ) => {
    const blockKey = block.getKey();
    const blockTypeAfter = contentState.getBlockAfter(blockKey)?.getType();
    const showInsertBlock = blockTypeAfter === "atomic" || !blockTypeAfter;

    const isSeleceted = editor.useChange(store => {
      return Boolean(
        store.selection.isSomeBlock && store.currentBlock.getKey() === blockKey
      );
    });

    return (
      <div className={clsx(classes.root)} id="wrapper">
        <div id="content">
          <MuiFocusableBox
            forceFocus={isSeleceted}
            onFocus={() => {
              store.update(
                "forceSelection",
                SelectionState.createEmpty(blockKey)
              );
            }}
          >
            {children}
          </MuiFocusableBox>
        </div>
        {showInsertBlock && (
          <div
            id="insert"
            className="rt-block-regular"
            onClick={() => {
              store
                .select({
                  anchorKey: blockKey,
                  endOfAnchor: true,
                })
                .insertBlocks([{ text: "" }]);
            }}
          />
        )}
      </div>
    );
  }
);

/*

  return (
      <>
        <div
          onMouseDown={() => {
            this.store.update(
              "forceSelection",
              SelectionState.createEmpty(atomicBlockKey)
            );
          }}
          className={clsx(
            this.store.currentBlock.getKey() === atomicBlockKey &&
              "rt-selected-atomic-block"
          )}
        >
          {element}
        </div>
        {(!blockTypeAfter || blockTypeAfter === "atomic") && (
          <div
            className="rt-insert-atomic-after-regular"
            onClick={() => {
              const newBlock = new ContentBlock({
                type: "regular",
                key: genKey(),
                text: "",
              });
              let content = this.store.content.update("blockMap", blockMap => {
                return blockMap.flatMap((block, key) => {
                  if (key === atomicBlockKey) {
                    return [
                      [key, block],
                      [newBlock.getKey(), newBlock],
                    ];
                  }
                  return [[key, block]];
                });
              });

              this.store.update("push", content as any, "insert-fragment");
              this.store.update(
                "forceSelection",
                SelectionState.createEmpty(newBlock.getKey())
              );
            }}
          />
        )}
      </>
    );
*/
