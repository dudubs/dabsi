import { ArrayOrItem } from "@dabsi/common/array/ArrayOrItem";
import {
  MuiEditorButton,
  MuiEditorButtonProps,
} from "@dabsi/system/rich-text/browser/editor/mui/button";
import { mergeElement } from "@dabsi/view/react/merging/mergeElement";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React from "react";

export type MuiEditorButtonGroupProps = {
  value: any;
  children: ArrayOrItem<React.ReactElement<MuiEditorButtonProps>>;
  onChange(value: any);

  disablePopover?: boolean;
};

const useStyles = makeStyles({
  arrow: { width: "0.5em", hegiht: "1em" },
});

export function MuiEditorButtonGroup({
  children,
  value,
  onChange,
  disablePopover,
}: // ...props
MuiEditorButtonGroupProps) {
  const items = ArrayOrItem(children);
  const classes = useStyles();
  const currentIndex = items.findIndex(item => item.props.value === value);
  const currentItem = items[currentIndex] || items[0];
  const buttonRef = React.useRef<any>(null);
  const [showMenu, setShowMenu] = React.useState(false);
  const selected = value !== undefined;

  const inline = (
    <Grid container>
      {items.map((item, index) => (
        <Grid item key={item.props.key || index}>
          {mergeElement(item, {
            selected: item.props.value === value,
            onClick: () => {
              setShowMenu(false);
              onChange(item.props.value);
            },
          })}
        </Grid>
      ))}
    </Grid>
  );

  if (disablePopover) return inline;
  return (
    <>
      {mergeElement(currentItem, {
        selected,
        buttonRef,
        icon: {
          $merge: icon => {
            return (
              <>
                <ArrowDropDownIcon
                  className={classes.arrow}
                  viewBox="7 0 24 24"
                  preserveAspectRatio="xMinYMin slice"
                  onClick={() => {
                    setShowMenu(true);
                  }}
                />
                {mergeElement(icon, {
                  onClick: (event: React.MouseEvent) => {
                    onChange(
                      event.ctrlKey
                        ? null
                        : items[(currentIndex + 1) % items.length]?.props.value
                    );
                  },
                })}
              </>
            );
          },
        },
      })}
      <Popover
        open={showMenu}
        anchorEl={() => buttonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ClickAwayListener onClickAway={() => setShowMenu(false)}>
          {inline}
        </ClickAwayListener>
      </Popover>
    </>
  );
}
