import "@dabsi/common/register";
import "@dabsi/view/lang";

globalThis.setImmediate ||= <any>((callback, ...args): any => {
  return setTimeout(callback, 0, ...args);
});

globalThis.clearImmediate ||= (id: any) => {
  clearTimeout(id);
};
