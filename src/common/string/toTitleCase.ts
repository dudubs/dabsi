import {TargetCase} from "./matchCase";

export const toTitleCase: TargetCase = words => words
    .map(text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
    .join(" ");

