import { SingleCall } from "@dabsi/common/patterns/SingleCall";

export default SingleCall(() => {
  return typeof globalThis["process"] === "object";
});
