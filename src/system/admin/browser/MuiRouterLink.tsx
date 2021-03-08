import {
  RouterLinkTarget,
  useRouterLink,
} from "@dabsi/typerouter/view/useRouterLinkOld";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import Link, { LinkProps } from "@material-ui/core/Link";
import React, { ReactElement } from "react";

export default function ({
  to: target,

  ...LinkProps
}: {
  to: RouterLinkTarget;
} & LinkProps): ReactElement {
  const link = useRouterLink(target);

  return (
    <Link
      href={link.location?.path || "#"}
      {...mergeProps(LinkProps, {
        onMouseEnter: () => {
          link.update();
        },
        onClick: event => {
          event.preventDefault();
          link.location!.push();
        },
      })}
    />
  );
}
