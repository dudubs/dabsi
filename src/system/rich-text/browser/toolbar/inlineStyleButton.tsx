import {
  MuiToolbarButton,
  MuiToolbarButtonProps,
} from "@dabsi/system/rich-text/browser/toolbar/button";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
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
  store,
  styleType,
  ...props
}: MuiToolbarButtonProps & {
  styleType: string;
  store: RichTextStore;
}) => {
  return (
    <MuiToolbarButton
      selected={store.currentBlock
        .getInlineStyleAt(store.selection.getStartOffset())
        .has(styleType)}
      icon={iconMap[styleType]}
      {...props}
      onClick={() => {
        store.state = RichUtils.toggleInlineStyle(store.state, styleType);
        store.update("forceSelection", store.selection);
      }}
    />
  );
};
