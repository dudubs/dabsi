import NativeHistory from "@dabsi/native/NativeHistory";
import RnpSystemBuilder from "@dabsi/system/core/native/RnpSystemBuilder";
import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter/view/RouterView";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

export default function RnpSystemRoot() {
  return (
    <PaperProvider>
      <SystemView build={RnpSystemBuilder}>
        <RouterView routerType={SystemRouter} history={NativeHistory} />
      </SystemView>
    </PaperProvider>
  );
}
