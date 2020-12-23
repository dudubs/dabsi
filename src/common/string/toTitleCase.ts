import { TargetCase } from "@dabsi/common/string/matchCase";

export default <TargetCase>(words => {
  let text = "";
  for (const word of words) {
    text += text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
});
