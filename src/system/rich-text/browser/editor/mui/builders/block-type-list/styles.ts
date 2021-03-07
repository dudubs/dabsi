import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import clsx from "clsx";

// TODO: move to list module

RichTextEditorGlobals.mui.styles.push((root, theme) => {
  root["& .rt-list"] = theme.typography.body1;
  root["& .rt-list > div"] = { display: "inline-block" };
  root["& .rt-list-UNORDERED:before"] = { content: `"- "` };
});

RichTextEditorGlobals.mui.depthStyles.push((depth, root) => {
  const p = "& .rt-list";
  root[p + ".rt-depth-" + depth] = {
    counterIncrement: "rt-list-counter-" + depth,
  };

  root[p + "-reset.rt-depth-" + depth] = {
    counterReset: "rt-list-counter-" + depth,
  };

  root[p + "-ORDERED.rt-depth-" + depth + ":before"] = {
    content: `counter(rt-list-counter-${depth}) ". "`,
  };
});

RichTextEditorGlobals.mui.builders.push(({ editor }) => {
  editor.defineBlockStyleFn(
    "list",
    ({ block: { key: blockKey }, blockData, store, block }) => {
      const blockBefore = store.content.getBlockBefore(blockKey);
      const blockBeforeIsAlsoList = blockBefore?.type === "list";
      const blockBeforeIsSomeListType =
        blockBeforeIsAlsoList &&
        blockBefore.get("data").get("block-list").type === blockData.type;

      const reset =
        !blockBeforeIsSomeListType || block.getDepth() > blockBefore.getDepth();

      return clsx(
        `rt-list`,
        "rt-list-" + blockData.type,
        reset && "rt-list-reset"
      );
    }
  );
  // editor.blockStyleFnMap.list = (data, block) => {
  // const blockKey = block.getKey();
  // const prevBlock = editor.store.content.getBlockBefore(blockKey);
  // const isPrevBlockList = prevBlock?.getType() === "list";
  // const isSomeListType =
  //   isPrevBlockList &&
  //   data.type === prevBlock.get("data").get("block-list")?.type;
  // const reset = !isSomeListType || block.getDepth() > prevBlock.getDepth();
  // return clsx(`rt-list rt-list-${data.type}`, reset && "rt-list-reset");
  // };
});
