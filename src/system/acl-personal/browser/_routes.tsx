import AclPersonalRouter from "@dabsi/system/acl-personal/view/AclPersonalRouter";
import { RouterView } from "@dabsi/typerouter2/view";
import React from "react";

export default RouterView(AclPersonalRouter, $ =>
  $.at("editProfile", $ => $.index(p => <>asd</>))
);
