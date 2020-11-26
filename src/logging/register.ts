import { Logger } from "./Logger";

declare global {
  const log: Logger;
}

Object.defineProperty(global, "log", {
  value: Logger(),
});
