import {Seq} from "immutable";
import {SourceCase} from "@dabsi/common/string/matchCase";


export const fromPropertyCase: SourceCase = text =>
    Seq.Indexed(text.matchAll(/[A-Z]?[^A-Z]*/g))
        .map(([text]) => text);
