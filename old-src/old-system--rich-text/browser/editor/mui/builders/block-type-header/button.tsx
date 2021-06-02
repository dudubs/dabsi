import { MuiEditorButton } from "@dabsi/system/rich-text/browser/editor/mui/button";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import useEditorStore from "@dabsi/system/rich-text/browser/editor/useEditorStore";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TitleIcon from "@material-ui/icons/Title";
import React, { useRef } from "react";

const levels = [6, 5, 4, 3, 2, 1];

export const MuiHeaderButton = ({ store }: { store: RichTextStore }) => {
  const ref = useRef({
    clicked: false,
    state: store.state,
  });
  return (
    <>
      <MuiEditorButton
        selected={store.currentBlock.getType() === "header"}
        onPress={() => {
          ref.current = {
            clicked: false,
            state: store.state,
          };
          store.update("forceSelection", store.selection);
        }}
        icon={<TitleIcon />}
        renderMenu={(Menu, props) => (
          <Menu
            role="menu"
            {...props}
            onMouseLeave={() => {
              if (!ref.current.clicked) store.state = ref.current.state;
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
                <Typography
                  variant={("h" + i) as "h1"}
                >{lang`HEADER`}</Typography>
              </MenuItem>
            ))}
          </Menu>
        )}
      />
    </>
  );
};
