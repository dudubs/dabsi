import MuiPersonalSiteWrapper from "@dabsi/system/acl-personal/browser/MuiPersonalSiteWrapper";
import AclPersonalRouter from "@dabsi/system/acl-personal/view/AclPersonalRouter";
import { RouterView } from "@dabsi/typerouter2/view";
import React from "react";

export default RouterView(AclPersonalRouter, $ =>
  $.wrap(p => (
    <MuiPersonalSiteWrapper>{p.children}</MuiPersonalSiteWrapper>
  )).index(p => <>xx</>)
);
