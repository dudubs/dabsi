import AclUserAreaView from "@dabsi/system/acl/admin/view/AclUserAreaView";
import React from "react";

export default (
  p: Pick<React.ComponentProps<typeof AclUserAreaView>, "children">
) => <AclUserAreaView {...p} />;
