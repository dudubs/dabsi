import { SystemView } from "@dabsi/system/core/view/SystemView";
import { ReactWrapper } from "@dabsi/view/react/wrapper";
import React from "react";

export const useSystemViewBuilders = ReactWrapper.createContext(() => {
  const builders = [] as {
    (componentMap: Record<any, any>): void;
  }[];

  ReactWrapper.push(children => {
    const prevContext = React.useContext(SystemView.Context);

    const nextContext = React.useMemo(() => {
      const componentMap = new Map(prevContext);
      for (const builder of builders) {
        builder(componentMap);
      }
      return componentMap;
    }, []);

    return React.createElement(SystemView.Context.Provider, {
      value: nextContext,
      children,
    });
  });

  return builders;
});
