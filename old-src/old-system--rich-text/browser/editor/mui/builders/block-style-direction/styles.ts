// list (numberic, dot)
// header
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";

RichTextEditorGlobals.mui.styles.push(root => {
  Object.assign(root, {
    "& .rt-direction-LTR": { direction: "ltr" },
    "& .rt-direction-RTL": { direction: "rtl" },
  });
});

RichTextEditorGlobals.mui.depthStyles.push((depth, root) => {
  const p = "& .rt-depth-" + depth + ".rt-direction-";
  root[p + "LTR"] = {
    marginLeft: 30 * depth,
  };
  root[p + "RTL"] = {
    marginRight: 30 * depth,
  };
});
