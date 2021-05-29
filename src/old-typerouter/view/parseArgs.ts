import { getRouterViewMetadata } from "@dabsi/typerouter/view/metadata";

export function parseArgs<O>(args) {
  let router;
  let options;
  let loader;
  let component;

  if (args.length === 2) {
    [router, component] = args;
    [options, loader] = [null, null];
  } else if (args.length == 3) {
    let optionsOrLoader;
    [router, optionsOrLoader, component] = args;
    [options, loader] =
      typeof optionsOrLoader === "function"
        ? [null, optionsOrLoader]
        : [optionsOrLoader, null];
  } else if (args.length === 4) {
    [router, options, loader, component] = args;
  }

  return {
    metadata: getRouterViewMetadata(router),
    router,
    options: (options || {}) as O,
    loader,
    component,
  };
}
