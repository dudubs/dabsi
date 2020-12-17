import { Logger } from "@dabsi/logging/Logger";

declare global {
  const log: Logger;
}

Object.defineProperty(global, "log", {
  value: Logger(),
});
