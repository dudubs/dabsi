import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextEditorBlock } from "@dabsi/system/rich-text/browser/editor/editorBlock";
import { MuiFocusable } from "@dabsi/system/rich-text/browser/editor/mui/focusable";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { MuiInsertLineAfter } from "@dabsi/system/rich-text/browser/editor/mui/builders/readonly-block/InsertLine";
import useEditorChange from "@dabsi/system/rich-text/browser/editor/useEditorChange";
import React from "react";

RichTextEditorGlobals.mui.builders.push(({ editor }) => {
  editor.blockWrappers.push((element, props) => {
    if (!props.editable) {
      element = (
        <MuiEditorReadonlyBlock editor={editor} blockProps={props}>
          {element}
        </MuiEditorReadonlyBlock>
      );
    }
    return element;
  });
});

RichTextEditorGlobals.mui.styles.push(root => {
  root["& .rt-layout-INLINE"] = { display: "inline-block" };
  root["& .rt-layout-FLOAT.rt-direction-RTL"] = {
    float: "left",
    clear: "both",
  };
  root["& .rt-layout-FLOAT.rt-direction-LTR"] = {
    float: "right",
    clear: "both",
  };
  root["& .rt-atomic-image.rt-layout-FLOAT"] = { maxWidth: "50%" };
  root["& .rt-atomic-image.rt-layout-FLOAT img"] = { width: "50%" };
});
function MuiEditorReadonlyBlock({
  children,
  editor,
  blockProps: { block, store },
}: {
  children: React.ReactElement;
  editor: RichTextEditor;
  blockProps: RichTextEditorBlock.Props<any>;
}) {
  const divRef = React.useRef<any>(null);

  const isSeleceted = useEditorChange(({ store }) => {
    return Boolean(
      store.selection.isSomeBlock && store.currentBlock.getKey() === block.key
    );
  });

  return (
    <div
      onMouseDown={() => {
        editor.readOnlyBecauseBlock = true;
      }}
      onMouseUp={() => {
        editor.readOnlyBecauseBlock = false;
      }}
    >
      <MuiInsertLineAfter {...{ store, block, editor }}>
        <MuiFocusable
          divRef={divRef}
          disablePadding
          inline
          forceFocus={isSeleceted}
          onFocus={() => {
            store.select({ anchorKey: block.key });
          }}
        >
          {children}
        </MuiFocusable>
      </MuiInsertLineAfter>
    </div>
  );
}
