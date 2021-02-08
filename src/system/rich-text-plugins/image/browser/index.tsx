import { MuiRichTextImageButton } from "@dabsi/system/rich-text-plugins/image/browser/toolbarButton";
import MuiRichTextImageComponent from "@dabsi/system/rich-text-plugins/image/browser/blockComponent";
import { RichTextEditorPlugins } from "@dabsi/system/rich-text/view/editorPlugins";
import { makeStyles } from "@material-ui/core/styles";
import { createElement } from "react";
import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";

const useStyles = makeStyles({
  hiddenFile: {
    display: "none",
  },
});

MuiRichTextEditorPlugins.push(editor => {
  editor.atomicBlockRendererMap.image = ({ entity }) => {
    return {
      editable: false,
      component: MuiRichTextImageComponent,
    };
  };
  editor.toolbars.push(() =>
    createElement(MuiRichTextImageButton, {
      editor,
    })
  );
});
