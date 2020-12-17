import {SourceCase} from "@dabsi/common/string/matchCase";
import {split} from "@dabsi/common/string/split";

export const fromConstantCase: SourceCase = text => split(text, "_");
