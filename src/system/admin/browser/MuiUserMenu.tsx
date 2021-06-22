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
import RouterViewNavigator from "@dabsi/typerouter2/view/RouterViewNavigator";
import ViewContext from "@dabsi/view/react/ViewContext";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { AclCurrentUserReactor } from "@dabsi/system/acl/view";

export function MuiUserMenu(p: { userName: string }) {
  const anchorElRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const c = ViewContext.use({ history: RouterViewNavigator });

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
          {...closeOnClick(async () => {
            await AclRpc.instance.logout();
            AclCurrentUserReactor.emit(null);
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
