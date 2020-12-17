import {TargetCase} from "@dabsi/common/string/matchCase";

export const toPropertyCase: TargetCase = words => words
    .map(word => word.charAt(0) + word.slice(1).toLowerCase()).join('');
