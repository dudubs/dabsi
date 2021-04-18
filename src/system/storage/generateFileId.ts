let counter = 0;
import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import crypto from "crypto";
import os from "os";

const getMachineId = SingleCall(() => {
  return crypto
    .createHash("md5")
    .update(os.hostname())
    .digest("base64")
    .slice(0, 6);
});
export default function generateFileId() {
  return getMachineId() + crypto.randomBytes(16).toString("hex");
}
