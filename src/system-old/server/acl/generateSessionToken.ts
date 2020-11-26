import crypto from "crypto";

export function generateSessionToken() {
  return crypto.randomBytes(128).toString("base64");
}
