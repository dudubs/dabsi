import { MuiRichTextImageButton } from "@dabsi/system/rich-text-plugins/image/browser/button";
import MuiRichTextImageComponent from "@dabsi/system/rich-text-plugins/image/browser/component";
import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/globals";
import { makeStyles } from "@material-ui/core/styles";

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

  editor.toolbars.push(() => {
    return <MuiRichTextImageButton editor={editor} />;
  });
});
