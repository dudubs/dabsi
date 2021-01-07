import { statSync } from "fs";

export default function (path: string) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}
