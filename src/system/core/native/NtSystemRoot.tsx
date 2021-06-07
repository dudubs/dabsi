import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import { useLoader } from "@dabsi/view/react/useLoader";
import { createMemoryHistory } from "history";
import React from "react";
import { Text, View } from "react-native";
import {
  Appbar,
  Button,
  DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const history = createMemoryHistory({ initialEntries: ["/"] });

export default function NtSystemRoot() {
  useLoader(async () => {});
  return (
    <PaperProvider theme={DarkTheme}>
      <RouterView routerType={SystemRouter} history={history} />
    </PaperProvider>
  );
}

RouterView(SystemRouter, $ =>
  $
    //
    .index(() => <Text>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>)
    .wrap(({ children }) => (
      <View>
        <Appbar.Header>
          <Appbar.BackAction />
          <Appbar.Content title="Title" subtitle="Subtitle" />
          <Appbar.Action icon="email-open" />
        </Appbar.Header>
        <Button mode="contained">asdasd</Button>
        {children}
        <Text>33</Text>
      </View>
    ))
);
