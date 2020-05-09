import {SourceCase} from "./matchCase";
import {split} from "./split";

export const fromConstantCase: SourceCase = text => split(text, "_");
