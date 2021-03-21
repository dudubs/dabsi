import { Renderer } from "@dabsi/view/react/renderer";
import { ReactElement } from "react";

export default {
  editUser: {
    excludeChildKeys: [] as string[],
    childWrapperMap: {} as Record<string, Renderer<ReactElement>>,
  },
};
