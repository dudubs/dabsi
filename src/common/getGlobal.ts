import Lazy from "@dabsi/common/patterns/Lazy";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";

export const getGlobal = SingleCall((): typeof globalThis => {
  try {
    return eval("window");
  } catch {
    return eval("globalThis");
  }
});
