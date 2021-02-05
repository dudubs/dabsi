import { relative } from "path";

export function posixPath(path: string) {
  return path.replace(/\\/g, "/");
}

export function relativePosixPath(from: string, to: string) {
  const rel = posixPath(relative(from, to));
  if (!rel.startsWith(".")) return "./" + rel;
  return rel;
}
