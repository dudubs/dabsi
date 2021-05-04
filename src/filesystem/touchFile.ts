import fs from "fs";

export async function touchFile(path: string) {
  try {
    const time = new Date();
    await fs.promises.utimes(path, time, time);
  } catch {
    await fs.promises.writeFile(path, "");
  }
}
