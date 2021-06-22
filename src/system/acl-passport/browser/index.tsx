import globalMessages from "@dabsi/common/globalMessages";
import AclPassportRouter from "@dabsi/system/acl-passport/browser/router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import { RouterView } from "@dabsi/typerouter2/view";
import React from "react";

const message = globalMessages.find(
  m => m.type === "AUTH_CALLBACK" || m.type === "AUTH_CALLBACK_FAILURE"
);

export default RouterView(AclPassportRouter, $ =>
  $.at("callback", $ =>
    $.default(p => {
      React.useEffect(() => {
        switch (message?.type) {
          case "AUTH_CALLBACK":
            const parsedLocation = RouterLocation.parse(
              p.path.location.root.routerType,
              message.backToPath
            );

            if (parsedLocation.type === "index") {
              p.navigator.push(parsedLocation.location);
            }

            break;
        }
      }, []);

      if (message?.type === "AUTH_CALLBACK_FAILURE") {
        return <pre>${JSON.stringify({ message })}</pre>;
      }

      return <>{lang`PLEASE_WAIT`}</>;
    })
  )
);
