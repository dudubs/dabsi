// list (numberic, dot)
// header
import { MuiRichTextStylePlugins } from "@dabsi/system/rich-text/browser/globals";

MuiRichTextStylePlugins.push(root => {
  Object.assign(root, {
    "& .rt-align-LEFT": { textAlign: "left !important" as any },
    "& .rt-align-CENTER": { textAlign: "center !important" as any },
    "& .rt-align-RIGHT": { textAlign: "right !important" as any },
    "& .rt-align-JUSTIFY": { textAlign: "justify !important" as any },
  });
});
