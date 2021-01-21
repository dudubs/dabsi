import MuiInsertImageToRichTextButton from "@dabsi/system/rich-text-plugins/image/browser/MuiRichTextImageButton";
import MuiRichTextImageComponent from "@dabsi/system/rich-text-plugins/image/browser/MuiRichTextImageComponent";
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";
import { makeStyles } from "@material-ui/core/styles";
import { createElement } from "react";

const useStyles = makeStyles({
  hiddenFile: {
    display: "none",
  },
});

RichTextEditorPlugins.push(editor => {
  editor.atomicBlockRendererFnMap.image = ({ entity }) => {
    return {
      editable: false,
      component: MuiRichTextImageComponent,
    };
  };
  editor.toolbar.push(() =>
    createElement(MuiInsertImageToRichTextButton, {
      editor,
    })
  );
});
