import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";

RichTextEditorGlobals.mui.styles.push((root, theme) => {
  for (let depth = 0; RichTextEditorGlobals.blockMaxDepth >= depth; depth++) {
    for (const plugin of RichTextEditorGlobals.mui.depthStyles) {
      plugin(depth, root, theme);
    }
  }
});
