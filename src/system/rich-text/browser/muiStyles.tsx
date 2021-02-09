// list (numberic, dot)
// header
import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export const maxDepth = 30;

const useStyles = makeStyles(
  theme => {
    const root: any = {
      "& .rt-block-regular": theme.typography.body1,
      "& .rt-align-LEFT": { textAlign: "left !important" as any },
      "& .rt-align-CENTER": { textAlign: "center !important" as any },
      "& .rt-align-RIGHT": { textAlign: "right !important" as any },
      "& .rt-direction-LTR": { direction: "ltr" },
      "& .rt-direction-RTL": { direction: "rtl" },
      "& .rt-list": theme.typography.body1,
      "& .rt-list > div": { display: "inline-block" },
    };

    for (let depth = 0; maxDepth >= depth; depth++) {
      {
        const p = "& .rt-depth-" + depth + ".rt-direction-";
        root[p + "LTR"] = {
          marginLeft: 30 * depth,
        };
        root[p + "RTL"] = {
          marginRight: 30 * depth,
        };
      }
      {
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
      }
    }

    for (let level = 1; 6 >= level; level++) {
      root["& .rt-block-header.rt-header-" + level] =
        theme.typography[("h" + level) as any];
    }

    return {
      root,
      // "block-ordered-list-item": {
      //   ...theme.typography.body1,
      //   "& ol": { padding: 0, margin: 0 },
      //   listStyleType: "none",
      //   "&>div": { display: "inline-block" },
      // },
      // "block-unordered-list-item": {
      //   ...theme.typography.body1,
      //   "& ol": { padding: 0, margin: 0 },
      //   listStyleType: "disc",
      //   "&>div": { display: "inline-block" },
      // },
      // ...(Array(maxDepth + 1)
      //   .toSeq()
      //   .map((_, i) => [
      //     "depth-" + i,
      //     {
      //       "&$direction-RTL": {
      //         marginRight: 15 * i,
      //       },
      //       "&$direction-LTR": {
      //         marginLeft: 15 * i,
      //       },
      //       "&$block-ordered-list-item": {
      //         "&:before": {
      //           content: `counter(ol${i}) ". "`,
      //           counterIncrement: "ol" + i,
      //         },
      //       },
      //       "&.public-DraftStyleDefault-reset": {
      //         counterReset: "ol" + i,
      //       },
      //     },
      //   ])
      //   .fromEntrySeq()
      //   .toObject() as {}),
    };
  },
  {
    name: "rte",
  }
);

MuiRichTextEditorPlugins.push(editor => {
  const { renderEditor } = editor;
  const classes = editor.useHook(useStyles);
  editor.renderEditor = () => {
    return <div className={classes.root}>{renderEditor.apply(editor)}</div>;
  };

  editor.blockStyleMap.list = (data, block) => {
    const blockKey = block.getKey();
    const prevBlock = editor.store.content.getBlockBefore(blockKey);

    const isPrevBlockList = prevBlock?.getType() === "list";

    const isSomeListType =
      isPrevBlockList &&
      data.listType === prevBlock.get("data").get("listType");

    const reset = !isSomeListType || block.getDepth() > prevBlock.getDepth();

    return clsx(`rt-list rt-list-${data.listType}`, reset && "rt-list-reset");
  };
  editor.blockStyleMap.header = data => {
    return `rt-header-${data.level}`;
  };
});
