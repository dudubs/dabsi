import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import { useStore } from "@dabsi/view/react/useStore";
import MuiPopoverSlider from "@dabsi/system/acl-user-avatar/browser/MuiPopoverSlider";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";

export default function MuiAvatarEditor({
  onCancel,
  onApply,
  ...props
}: {
  image: string;
  onLoadSuccess?();
  onLoadFailure?();
  onCancel?();
  onApply?(_: { canvas: HTMLCanvasElement });
}) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef<any>(null);

  const { store, state } = useStore(() => ({ scale: 1, rotate: 50 }));

  return (
    <MuiGrid spacing={1} direction="column" alignItems="center">
      <div ref={editorContainerRef}>
        <AvatarEditor
          {...props}
          ref={editorRef}
          width={120}
          height={120}
          borderRadius={100}
          border={0}
          scale={state.scale / 25 + 1}
          rotate={((state.rotate - 50) / 100) * 360}
        />
      </div>

      <div>
        <IconButton size="small" color="primary" onClick={() => onCancel?.()}>
          <CancelIcon />
        </IconButton>
        <MuiPopoverSlider
          store={store.at("scale")}
          anchorEl={() => editorContainerRef.current}
          moreIcon={<ZoomInIcon />}
          lessIcon={<ZoomOutIcon />}
        />
        <MuiPopoverSlider
          store={store.at("rotate")}
          anchorEl={() => editorContainerRef.current}
          moreIcon={<RotateLeftIcon />}
          lessIcon={<RotateRightIcon />}
        />
        <IconButton
          size="small"
          color="primary"
          onClick={() =>
            onApply?.({
              canvas: editorRef.current!.getImageScaledToCanvas(),
            })
          }
        >
          <CheckIcon />
        </IconButton>
      </div>
    </MuiGrid>
  );
}
