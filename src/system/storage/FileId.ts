let counter = 0;
import Lazy from "@dabsi/common/patterns/Lazy";
import crypto from "crypto";
import os from "os";

const getMachineId = Lazy(() => {
  return crypto
    .createHash("md5")
    .update(os.hostname())
    .digest("base64")
    .slice(0, 6);
});
export default function FileId() {
  return getMachineId() + crypto.randomBytes(16).toString("hex");
}
