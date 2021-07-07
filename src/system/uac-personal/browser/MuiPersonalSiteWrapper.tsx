import MuiUserAreaView from "@dabsi/system/acl/admin/browser/MuiUserAreaView";
import MuiSiteWrapper from "@dabsi/system/site/browser/MuiSiteWrapper";
import React from "react";

export default (p: { children: React.ReactNode }) => {
  return (
    <MuiSiteWrapper>
      <MuiUserAreaView>{p.children}</MuiUserAreaView>
    </MuiSiteWrapper>
  );
};
