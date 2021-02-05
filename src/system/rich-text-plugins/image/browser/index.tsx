import { MuiRichTextImageButton } from "@dabsi/system/rich-text-plugins/image/browser/toolbarButton";
import MuiRichTextImageComponent from "@dabsi/system/rich-text-plugins/image/browser/blockComponent";
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";
import { makeStyles } from "@material-ui/core/styles";
import { createElement } from "react";

const useStyles = makeStyles({
  hiddenFile: {
    display: "none",
  },
});

RichTextEditorPlugins.push(editor => {
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
