import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import { useStore } from "@dabsi/view/react/useStore";
import { Store } from "@dabsi/store";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import React, { ReactElement } from "react";
import { MuiPopover } from "./MuiPopover";

export default ({
  anchorEl,
  lessIcon,
  moreIcon,
  menuIcon = moreIcon,
  store: { state, store } = useStore(() => 0),
}: {
  anchorEl;
  store?: Store<number>;
  lessIcon: ReactElement;
  moreIcon: ReactElement;
  menuIcon?: ReactElement;
}) => {
  return (
    <MuiPopover
      anchorEl={anchorEl}
      renderButton={props => (
        <IconButton {...props} size="small" color="primary">
          {menuIcon}
        </IconButton>
      )}
    >
      <MuiGrid spacing={2} alignItems="center">
        <IconButton
          color="primary"
          size="small"
          onClick={() => store.update(state => Math.max(state - 10, 1))}
        >
          {lessIcon}
        </IconButton>
        <Grid item xs>
          <Slider
            min={1}
            max={100}
            value={state}
            defaultValue={state}
            onChange={(_, value: number) => {
              store.set(value);
            }}
          ></Slider>
        </Grid>{" "}
        <IconButton
          size="small"
          color="primary"
          onClick={() => store.update(state => Math.min(state + 10, 100))}
        >
          {moreIcon}
        </IconButton>
      </MuiGrid>
    </MuiPopover>
  );
};
