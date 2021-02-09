import { makeStyles } from "@material-ui/core/styles";
// import "draft-js/dist/Draft.css";
import React, { ReactElement } from "react";

const useStyles = makeStyles({
  focused: { border: "2px solid blue" },
  over: { border: "1px solid blue" },

  image: { display: "block", padding: 0, margin: 0 },
});

export default function RichTextImageComponent({
  entityData,
}: IRichText.AtomicBlockComponentProps): ReactElement {
  const classes = useStyles();

  return <img src={entityData.url} className={classes.image} />;
}
