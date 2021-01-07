import path from "path";

export default function* (dir: string) {
  while (dir) {
    yield dir;
    const nextdir = path.dirname(dir);
    if (nextdir.length === dir.length) break;
    dir = nextdir;
  }
}
