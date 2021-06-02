let r;
try {
  r = eval("require");
} catch {
  r = () => null;
}

export default function requireRpcHandler(fileName: string): any {
  const path = r("path");

  if (!path) {
    return function () {
      throw new Error("No handler for view");
    };
  }

  const handlerName = path.basename(fileName).replace(/\.ts$/, "Handler");
  const module = require(path.join(
    path.resolve(path.dirname(fileName), ".."),
    handlerName + ".ts"
  ));
  const handler = module["default"];
  if (typeof handler !== "function") {
    throw new Error(`No rpc handler for "${fileName}".`);
  }
  return handler;
}
