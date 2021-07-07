import { UacCurrentUser } from "@dabsi/system/uac/common/UacCurrentUser";
import { UacCurrentUserReactor } from "@dabsi/system/uac/view";
import React from "react";

export default (p: {
  renderLoading?(): React.ReactElement;
  renderLogin?(): React.ReactElement;
  children:
    | React.ReactNode
    | ((currentUser: UacCurrentUser) => React.ReactElement);
}): React.ReactElement => {
  const currentUser = UacCurrentUserReactor.use();

  if (currentUser === undefined) {
    return p.renderLoading?.() || <>{lang`LOADING`}</>;
  }

  if (currentUser === null) {
    return p.renderLogin?.() || <>{lang`NO_ACCESS`}</>;
  }

  if (typeof p.children === "function") {
    return p.children(currentUser);
  }
  return <>{p.children}</>;
};
