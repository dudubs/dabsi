import { Renderer } from "@dabsi/react/renderer";
import { ReactElement } from "react";
import ViewWrapper from "./ViewWrapper";

export default {
  editUser: {
    excludeChildKeys: [] as string[],
    childWrapperMap: {} as Record<string, Renderer<ReactElement>>,
  },
};