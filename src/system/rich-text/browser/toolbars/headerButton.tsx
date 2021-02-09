import { MuiToolbarButton } from "@dabsi/system/rich-text/browser/toolbars/button";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TitleIcon from "@material-ui/icons/Title";
import React, { useRef, useState } from "react";

const levels = [6, 5, 4, 3, 2, 1];

export const MuiHeaderButton = ({ store }: { store: RichTextStore }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef({
    clicked: false,
    state: store.state,
  });
  return (
    <>
      <MuiToolbarButton
        onMouseDown={event => {
          event.preventDefault();
          ref.current = {
            clicked: false,
            state: store.state,
          };
          setAnchorEl(event.target as any);
          store.update("forceSelection", store.selection);
        }}
      >
        <TitleIcon />
      </MuiToolbarButton>
      <Menu
        role="menu"
        anchorEl={() => anchorEl!}
        open={Boolean(anchorEl)}
        onMouseLeave={() => {
          store.state = ref.current.state;
        }}
        onClick={() => {
          setAnchorEl(null);
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
            ref.current.clicked = true;
          }}
          onMouseEnter={() => {
            if (ref.current.clicked) return;
            store.state = ref.current.state;
            store.applyHeader(0);
            console.log("reset");
          }}
        >
          <Typography>{lang`NORMAL`}</Typography>
        </MenuItem>
        {levels.map(i => (
          <MenuItem
            key={i}
            onMouseEnter={() => {
              if (ref.current.clicked) return;
              store.state = ref.current.state;
              store.applyHeader(i);
            }}
            onClick={() => {
              ref.current.clicked = true;
            }}
          >
            <Typography variant={("h" + i) as "h1"}>{lang`HEADER`}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
