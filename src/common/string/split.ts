import { Seq } from "immutable";

export function* _split(text: string, sep: string): IterableIterator<string> {
  let start = 0;
  while (true) {
    const pos = text.indexOf(sep, start);
    if (-1 === pos) {
      break;
    }
    yield text.slice(start, pos);
    start = pos + sep.length;
  }
  yield start ? text.slice(start) : text;
}

export const split = (text: string, sep: string) =>
  Seq.Indexed(_split(text, sep));
