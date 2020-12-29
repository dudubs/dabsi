export function getMode(): "production" | "testing" | "development" {
  return global["SYSTEM_MODE"];
}

export const isDevMode = () => getMode() === "development";
export const isProdMode = () => getMode() === "production";
//
export const isTestingMode = () => getMode() === "testing";
