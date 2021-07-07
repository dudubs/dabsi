import AclUserAreaView from "@dabsi/system/acl/admin/view/AclUserAreaView";
import { MuiLoginFormView } from "@dabsi/system/acl/browser/MuiLoginFormView";
import React from "react";

export default (
  p: Pick<React.ComponentProps<typeof AclUserAreaView>, "children">
) => <AclUserAreaView {...p} renderLogin={() => <MuiLoginFormView />} />;
