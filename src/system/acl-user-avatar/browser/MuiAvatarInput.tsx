import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import { useStore } from "@dabsi/react/useStore";
import MuiAvatarEditor from "@dabsi/system/acl-user-avatar/browser/MuiAvatarEditor";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useRef } from "react";

export const useStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      width: 120,
      height: 120,
    },
    popperPaper: {
      padding: theme.spacing(1),
      zIndex: 2,
      width: 200,
    },
    fileInput: {
      display: "none",
    },
  })
);

export default function MuiAvatarInput(props: {
  url: string | undefined;
  onChange?(canvas: HTMLCanvasElement);
}) {
  const classes = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { store, state } = useStore(() => ({
    imageUrl: props.url,
  }));

  return (
    <>
      <input
        ref={fileInputRef}
        accept="image/*"
        className={classes.fileInput}
        type="file"
        onChange={() => {
          const file = fileInputRef.current!.files?.[0];
          if (file) {
            store.set("imageUrl", URL.createObjectURL(file));
          }
        }}
      />
      {state.imageUrl ? (
        <>
          <MuiAvatarEditor
            image={state.imageUrl}
            onLoadSuccess={() => {
              state.imageUrl && URL.revokeObjectURL(state.imageUrl);
            }}
            onCancel={() => {
              store.set("imageUrl", "");
            }}
            onApply={({ canvas }) => {
              props.onChange?.(canvas);
            }}
          />
        </>
      ) : (
        <>
          <MuiGrid alignItems="center" spacing={1} direction="column">
            <Avatar className={classes.avatar} />
            <Button
              endIcon={<CloudUploadIcon />}
              onClick={() => {
                fileInputRef.current!.click();
              }}
            >
              Upload
            </Button>
          </MuiGrid>
        </>
      )}
    </>
  );
}
