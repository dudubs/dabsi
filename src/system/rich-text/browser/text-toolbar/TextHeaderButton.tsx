import ToolbarButton from "@dabsi/system/rich-text/browser/text-toolbar/ToolbarButton";
import { RichTextStore } from "@dabsi/system/rich-text/common/store";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TitleIcon from "@material-ui/icons/Title";
import React, { useRef, useState } from "react";

const variantTypes = ["h6", "h5", "h4", "h3", "h2", "h1"];

export default ({ store }: { store: RichTextStore }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef({ type: null as any, clicked: false, state: store.state });
  return (
    <>
      <ToolbarButton
        onMouseDown={event => {
          event.preventDefault();

          ref.current = {
            type: store.startBlock.getType(),
            clicked: false,
            state: store.state,
          };
          setAnchorEl(event.target as any);
          store.update("forceSelection", store.selection);
        }}
      >
        <TitleIcon />
      </ToolbarButton>
      <Menu
        role="menu"
        anchorEl={() => anchorEl!}
        open={Boolean(anchorEl)}
        onMouseLeave={() => {
          store.setBlockType(ref.current.type);
        }}
        onClose={() => {
          setAnchorEl(null);
          if (!ref.current.clicked) {
            store.state = ref.current.state;
          }
        }}
      >
        <MenuItem
          onClick={() => {
            store.state = ref.current.state;
            store.setBlockType("unstyled");
          }}
        >
          <Typography>{lang`NORMAL`}</Typography>
        </MenuItem>
        {variantTypes.map(i => (
          <MenuItem
            key={i}
            onMouseEnter={() => {
              store.state = ref.current.state;
              store.setBlockType(i);
            }}
            onClick={() => {
              setAnchorEl(null);
              ref.current.clicked = true;
            }}
          >
            <Typography variant={i as "h1"}>{lang`HEADER`}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
