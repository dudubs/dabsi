import BrowserHistory from "@dabsi/browser/BrowserHistory";
import "@dabsi/common/register";
import "@dabsi/view/lang";
import configureViewLoaderByHistory from "../view/configureViewLoaderByHistory";
globalThis.setImmediate ||= <any>((callback, ...args): any => {
  return setTimeout(callback, 0, ...args);
});

globalThis.clearImmediate ||= (id: any) => {
  clearTimeout(id);
};

configureViewLoaderByHistory(BrowserHistory);
