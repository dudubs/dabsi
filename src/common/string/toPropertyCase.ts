import { entries } from "@dabsi/common/object/entries";
import { TargetCase } from "@dabsi/common/string/matchCase";

export const toPropertyCase: TargetCase = words => {
  let text = "";
  let index = 0;
  for (let word of words) {
    const isFirstWord = !index++;
    if (isFirstWord) {
      word = word.toLowerCase();
    } else {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    text += word;
  }
  return text;
};
