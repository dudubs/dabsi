import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React from "react";

export function MuiUserMenu(p: { userName: string }) {
  const anchorElRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const closeOnClick = callback => ({
    onClick: () => {
      setOpen(false);
      callback();
    },
  });

  return (
    <>
      <Typography color="inherit" variant="subtitle2">
        {lang`HELLO_${"name"}`({ name: p.userName })}
      </Typography>
      <IconButton
        color="inherit"
        ref={anchorElRef}
        onClick={() => setOpen(true)}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={() => anchorElRef.current!}
        onClose={() => setOpen(false)}
      >
        <MenuItem
          {...closeOnClick(() => {
            //
          })}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          {lang`LOGOUT`}
        </MenuItem>
      </Menu>
    </>
  );
}
