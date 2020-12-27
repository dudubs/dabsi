import { Seq } from "immutable";
import { TargetCase } from "@dabsi/common/string/matchCase";

export default <TargetCase>(words =>
  Seq.Indexed(words)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "));
