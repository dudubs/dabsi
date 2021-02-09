// list (numberic, dot)
// header
import {
  MuiRichTextEditorPlugins,
  MuiRichTextStylePlugins,
} from "@dabsi/system/rich-text/browser/globals";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  theme => {
    const root: any = {
      "& .rt-block-regular": theme.typography.body1,
    };

    for (const plugin of MuiRichTextStylePlugins) {
      plugin(root, theme);
    }

    return {
      root,
    };
  },
  {
    name: "rte",
  }
);

MuiRichTextEditorPlugins.push(editor => {
  const { renderEditor } = editor;
  const classes = editor.useHook(useStyles);
  editor.renderEditor = () => {
    return <div className={classes.root}>{renderEditor.apply(editor)}</div>;
  };
});
