import { relative } from "path";

export function posixPath(path: string) {
  return path.replace(/\\/g, "/");
}

export function relativePosixPath(from: string, to: string) {
  return posixPath(relative(from, to));
}
