import { AnyRouter } from "@dabsi/typerouter/router";
import useRouterLink from "@dabsi/typerouter/useRouterLink";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import Link, { LinkProps } from "@material-ui/core/Link";
import React, { ReactElement } from "react";

export default function ({
  router,
  ...LinkProps
}: {
  router: () => AnyRouter;
} & LinkProps): ReactElement {
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
