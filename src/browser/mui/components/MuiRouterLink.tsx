import { Override } from "@dabsi/common/typings2/Override";
import { Router } from "@dabsi/typerouter";
import RouterLink, { RouterLinkProps } from "@dabsi/typerouter/view/RouterLink";
import { Link } from "@material-ui/core";
import React from "react";

export default MuiRouterLink;

export function MuiRouterLink<T extends Router>({
  children,
  ...p
}: Override<
  RouterLinkProps<T>,
  {
    children: React.ReactElement;
  }
>): React.ReactElement {
  return (
    <RouterLink {...p}>
      {p => (
        <Link
          href="#"
          onMouseEnter={event => {
            event.target.href = p.path;
          }}
          onFocus={event => {
            event.target.href = p.path;
          }}
          onClick={event => {
            event.preventDefault();
            p.push();
          }}
        >
          {children}
        </Link>
      )}
    </RouterLink>
  );
}
