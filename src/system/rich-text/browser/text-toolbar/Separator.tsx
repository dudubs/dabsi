import withStyles from "@dabsi/system/rich-text/browser/text-toolbar/withStyles";

export default withStyles(theme => ({
  root: {
    display: "inline-block",
    backgroundColor: theme.palette.grey[500],
    width: 1,
    height: 20,
    verticalAlign: "middle",
    marginLeft: theme.spacing(0.2),
    marginRight: theme.spacing(0.2),
  },
}))("span");
