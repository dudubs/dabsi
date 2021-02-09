import withStyles from "@dabsi/browser/mui/withStyles";

export const MuiSeparator = withStyles(theme => ({
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
