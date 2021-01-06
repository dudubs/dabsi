import { Link } from "@material-ui/core";
import React from "react";
import { ReactElement } from "react";
import { MuiLinkProps } from "@dabsi/browser/mui/components/MuiLink";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { AnyRouter } from "@dabsi/typerouter/Router";
import useRouterLink from "@dabsi/typerouter/useRouterLink";

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
