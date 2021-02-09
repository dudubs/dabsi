// list (numberic, dot)
// header
import { MuiRichTextStylePlugins } from "@dabsi/system/rich-text/browser/globals";
import { MuiRichTextDepthPlugins } from "@dabsi/system/rich-text/browser/plugins/depth/globals";

MuiRichTextStylePlugins.push(root => {
  Object.assign(root, {
    "& .rt-direction-LTR": { direction: "ltr" },
    "& .rt-direction-RTL": { direction: "rtl" },
  });
});

MuiRichTextDepthPlugins.push((depth, root) => {
  const p = "& .rt-depth-" + depth + ".rt-direction-";
  root[p + "LTR"] = {
    marginLeft: 30 * depth,
  };
  root[p + "RTL"] = {
    marginRight: 30 * depth,
  };
});
