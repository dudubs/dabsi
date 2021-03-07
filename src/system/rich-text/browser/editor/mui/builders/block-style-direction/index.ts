import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import "./styles";
import "./toolbar";

RichTextEditorGlobals.mui.builders.push(({ editor }) => {
  const updateDefaultDirection = x => {
    editor.defaultDirection =
      getComputedStyle(x).direction?.toLowerCase() === "rtl" ? "RTL" : "LTR";
  };
  updateDefaultDirection(document.body);
});
