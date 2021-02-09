import { MuiRichTextStylePlugins } from "@dabsi/system/rich-text/browser/globals";
import {
  maxDepth,
  MuiRichTextDepthPlugins,
} from "@dabsi/system/rich-text/browser/plugins/depth/globals";

MuiRichTextStylePlugins.push((root, theme) => {
  for (let depth = 0; maxDepth >= depth; depth++) {
    for (const plugin of MuiRichTextDepthPlugins) {
      plugin(depth, root, theme);
    }
  }
});
