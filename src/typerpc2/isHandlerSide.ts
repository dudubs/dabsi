import { getGlobal } from "@dabsi/common/getGlobal";
import Lazy from "@dabsi/common/patterns/Lazy";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";

export const isHandlerSide = SingleCall(() => {
  return typeof getGlobal()["process"] === "object";
});
