// list (numberic, dot)
// header
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  theme => {
    const root: any = {
      "& .rt-block-regular": theme.typography.body1,
    };

    for (const plugin of RichTextEditorGlobals.mui.styles) {
      plugin(root, theme);
    }

    return {
      root,
      "@global": {
        "[contenteditable]": {
          outline: 0,
        },
      },
    };
  },
  {
    name: "rte",
  }
);

RichTextEditorGlobals.mui.builders.push(({ editor }) => {
  editor.wrappers.push(element => {
    const classes = useStyles();
    return <div className={classes.root}>{element}</div>;
  });
});
