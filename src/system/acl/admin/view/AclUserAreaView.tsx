import { AclCurrentUser } from "@dabsi/system/acl/common/AclCurrentUser";
import { AclCurrentUserReactor } from "@dabsi/system/acl/view";
import React from "react";

export default (p: {
  renderLoading?(): React.ReactElement;
  renderLogin?(): React.ReactElement;
  children:
    | React.ReactNode
    | ((currentUser: AclCurrentUser) => React.ReactElement);
}): React.ReactElement => {
  const currentUser = AclCurrentUserReactor.use();

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
