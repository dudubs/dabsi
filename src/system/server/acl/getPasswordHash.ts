import * as crypto from "crypto";

export function getPasswordHash(password: string): string {
  return crypto.createHash("sha256").update(password).digest("base64");
}
