import {
  MuiToolbarButton,
  MuiToolbarButtonProps,
} from "@dabsi/system/rich-text/browser/toolbars/button";
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
  inlineStyle,
  ...props
}: MuiToolbarButtonProps & {
  inlineStyle: string;
  store: RichTextStore;
}) => {
  return (
    <MuiToolbarButton
      selected={store.currentBlock
        .getInlineStyleAt(store.selection.getStartOffset())
        .has(inlineStyle)}
      icon={iconMap[inlineStyle]}
      {...props}
      onClick={() => {
        store.state = RichUtils.toggleInlineStyle(store.state, inlineStyle);
        store.update("forceSelection", store.selection);
      }}
    />
  );
};
