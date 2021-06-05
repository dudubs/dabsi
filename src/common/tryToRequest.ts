// useful when you want to make dynamic require.

import { SingleCall } from "@dabsi/common/patterns/SingleCall";

const getRequire = SingleCall(() => {
  try {
    return eval("require");
  } catch {}
});

export default function tryToRequire(name: string) {
  try {
    return getRequire()?.(name);
  } catch {}
}
