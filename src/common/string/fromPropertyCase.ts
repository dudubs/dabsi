import { Seq } from "immutable4";
import { SourceCase } from "@dabsi/common/string/matchCase";

export default <SourceCase>(
  ((text): Iterable<string> =>
    Seq.Indexed(
      text.matchAll(/[A-Z]?[^A-Z]*/g)[Symbol.iterator]() as Iterable<any>
    ).map(([text]) => text!))
);
