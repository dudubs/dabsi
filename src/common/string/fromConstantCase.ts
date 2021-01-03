import { SourceCase } from "./matchCase";
import split from "@dabsi/common/string/split";

export default <SourceCase>(text => split(text, "_"));
