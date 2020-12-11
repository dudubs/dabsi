import { Link } from "@material-ui/core";
import * as React from "react";
import { ReactElement } from "react";
import { MuiLinkProps } from "../../../browser/mui/components/MuiLink";
import { mergeProps } from "../../../react/utils/mergeProps";
import { AnyRouter } from "../../../typerouter/Router";
import useRouterLink from "../../../typerouter/useRouterLink";

export default function ({
  router,
  ...LinkProps
}: {
  router: () => AnyRouter;
} & MuiLinkProps): ReactElement {
  const link = useRouterLink(router);

  return (
    <Link
      href={link.path}
      onClick={event => {
        event.preventDefault();
        link.push();
      }}
      {...mergeProps(LinkProps, {
        onMouseOver: () => {
          link.update();
        },
      })}
    />
  );
}
