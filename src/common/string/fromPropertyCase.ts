import { Seq } from "immutable";
import { SourceCase } from "@dabsi/common/string/matchCase";

export const fromPropertyCase: SourceCase = (text): Iterable<string> =>
  Seq.Indexed(
    text.matchAll(/[A-Z]?[^A-Z]*/g)[Symbol.iterator]() as Iterable<any>
  ).map(([text]) => text!);

export const fromPropertyCa2se = (text): Iterable<any> => Seq.Indexed([]);
