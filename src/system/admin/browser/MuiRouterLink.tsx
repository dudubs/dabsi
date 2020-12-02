import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { MuiLink, MuiLinkProps } from "../../../browser/mui/components/MuiLink";
import { mergeProps } from "../../../react/utils/mergeProps";
import { ReactRouterLink } from "../../../typerouter/ReactRouterLink";
import { AnyRouter } from "../../../typerouter/Router";

export function MuiRouterLink({
  router,
  children,
  MuiLinkProps,
}: {
  router: AnyRouter | (() => AnyRouter);
  children?: ReactNode;
  MuiLinkProps?: MuiLinkProps;
}): ReactElement {
  return (
    <ReactRouterLink
      router={router}
      children={props => {
        return (
          <MuiLink
            {...mergeProps(MuiLinkProps, {
              onClick: event => {
                event.preventDefault();
                props.push();
              },
              onMouseOver: event => {
                props.update();
              },
            })}
            href={props.path || "#"}
          >
            {children}
          </MuiLink>
        );
      }}
    />
  );
}
