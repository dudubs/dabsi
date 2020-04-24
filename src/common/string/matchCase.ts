import {Seq} from "immutable";

export type TargetCase = (words: Seq.Indexed<string>) => string;
export type SourceCase = (text: string) => Seq.Indexed<string>;

export function matchCase(
    text: string,
    source: SourceCase,
    target: TargetCase
) {
    return target(source(text))
}
