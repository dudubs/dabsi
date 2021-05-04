import "@dabsi/common/register";
import { getGlobal } from "@dabsi/common/getGlobal";
import "@dabsi/view/lang";

getGlobal().setImmediate ||= <any>((callback, ...args): any => {
  return setTimeout(callback, 0, ...args);
});

getGlobal().clearImmediate ||= (id: any) => {
  clearTimeout(id);
};
