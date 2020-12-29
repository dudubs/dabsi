import fs from "fs";
export const POLL_TO_WATCH = !!process.env.WSL_DISTRO_NAME;

function getWatchFn() {
  if (POLL_TO_WATCH) {
    return require("node-watch");
  } else {
    return require("fs").watch;
  }
}

function watch(...args) {
  return getWatchFn()(...args);
}

export default watch as typeof fs.watch;
