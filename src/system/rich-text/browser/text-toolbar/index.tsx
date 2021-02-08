import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";
// list (numberic, dot)
// header
import ToolbarSeparator from "@dabsi/system/rich-text/browser/ToolbarSeparator";
import TextHeaderButton from "@dabsi/system/rich-text/browser/text-toolbar/TextHeaderButton";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatIndentDecreaseIcon from "@material-ui/icons/FormatIndentDecrease";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatTextdirectionLToRIcon from "@material-ui/icons/FormatTextdirectionLToR";
import FormatTextdirectionRToLIcon from "@material-ui/icons/FormatTextdirectionRToL";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import InfoIcon from "@material-ui/icons/Info";
import { convertToRaw, RichUtils } from "draft-js";
import React from "react";
import "./styles";
import ToolbarButton from "./ToolbarButton";
const maxDepth = 10;

MuiRichTextEditorPlugins.push(editor => {
  const {
    store,
    editorProps: { blockStyleFn },
  } = editor;

  editor.bindKey("Tab", event => {
    event.preventDefault();
    store.adjustDepth(event.shiftKey ? -1 : 1, maxDepth);
  });

  const styleTypes: [string, React.ReactElement][] = [
    ["BOLD", <FormatBoldIcon />],
    ["ITALIC", <FormatItalicIcon />],
    ["UNDERLINE", <FormatUnderlinedIcon />],
  ];

  const alignTypes: [string, React.ReactElement][] = [
    ["LEFT", <FormatAlignLeftIcon />],
    ["CENTER", <FormatAlignCenterIcon />],
    ["RIGHT", <FormatAlignRightIcon />],
    ["JUSTIFY", <FormatAlignJustifyIcon />],
  ];
  // console.log({Draft});
  const directionTypes: [string, any][] = [
    ["LTR", <FormatTextdirectionLToRIcon />],
    ["RTL", <FormatTextdirectionRToLIcon />],
  ];

  editor.toolbars.push(() => {
    const block = store.content.getBlockForKey(store.selection.getStartKey());

    const inlineStyles = block.getInlineStyleAt(
      store.selection.getStartOffset()
    );

    return (
      <>
        {styleTypes.map(([type, icon]) => (
          <ToolbarButton
            key={type}
            selected={inlineStyles.has(type)}
            size="small"
            onClick={() => {
              store.state = RichUtils.toggleInlineStyle(store.state, type);
              store.update("forceSelection", store.selection);
            }}
          >
            {icon}
          </ToolbarButton>
        ))}
        <ToolbarSeparator />
        <ToolbarButton onClick={() => store.adjustDepth(1, maxDepth)}>
          <FormatIndentIncreaseIcon />
        </ToolbarButton>
        <ToolbarButton onClick={() => store.adjustDepth(-1, maxDepth)}>
          <FormatIndentDecreaseIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        {alignTypes.map(([align, icon]) => (
          <ToolbarButton
            key={align}
            selected={block.getData().get("align") === align}
            onClick={() => store.applyAlignment(align)}
          >
            {icon}
          </ToolbarButton>
        ))}
        <ToolbarSeparator />
        {directionTypes.map(([direction, icon]) => (
          <ToolbarButton
            key={direction}
            selected={block.getData().get("direction") === direction}
            onClick={() => store.applyDirection(direction)}
          >
            {icon}
          </ToolbarButton>
        ))}
        <ToolbarSeparator />
        <TextHeaderButton store={store} />
        <ToolbarButton
          onClick={() => store.setBlockType("unordered-list-item")}
        >
          <FormatListBulletedIcon />
        </ToolbarButton>{" "}
        <ToolbarButton onClick={() => store.setBlockType("ordered-list-item")}>
          <FormatListNumberedIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            console.log(convertToRaw(store.content), null, 2);
          }}
        >
          <InfoIcon />
        </ToolbarButton>
      </>
    );
  });
});
