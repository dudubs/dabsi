import {
  MuiEditorButton,
  MuiEditorButtonProps,
} from "@dabsi/system/rich-text/browser/editor/mui/button";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import { RichUtils } from "draft-js";
const iconMap = {
  BOLD: <FormatBoldIcon />,
  UNDERLINE: <FormatUnderlinedIcon />,
  ITALIC: <FormatItalicIcon />,
};

export const MuiInlineStyleButton = ({
  styleType,
  store,
  ...props
}: Omit<MuiEditorButtonProps, "icon"> & {
  styleType: string;
  store: RichTextStore;
}) => {
  return (
    <MuiEditorButton
      selected={store.currentBlock
        .getInlineStyleAt(store.selection.getStartOffset())
        .has(styleType)}
      icon={iconMap[styleType]}
      {...props}
      onPress={() => {
        store.state = RichUtils.toggleInlineStyle(store.state, styleType);
        store.update("forceSelection", store.selection);
      }}
    />
  );
};
