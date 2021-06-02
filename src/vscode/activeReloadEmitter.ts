import fs from "fs";
import path from "path";
import vscode from "vscode";

export function activeReloadEmitter() {
  const workspacePath = vscode.workspace.workspaceFolders![0].uri.path;

  vscode.window.showInformationMessage("dabsi for vscode is activate.");

  vscode.workspace.onDidSaveTextDocument(async e => {
    if (!/[\\\/]src[\\\/]/.test(e.fileName)) return;

    let platform: string;
    if (/[\\\/]browser[\\\/]/.test(e.fileName)) {
      platform = "browser";
    } else if (/[\\\/]native[\\\/]/.test(e.fileName)) {
      platform = "native";
    } else if (/([\\\/]view[\\\/]|view\.)/i.test(e.fileName)) {
      platform = "view";
    } else if (/[\\\/]common[\\\/]/.test(e.fileName)) {
      platform = "common";
    } else {
      platform = "server";
    }
    await reload(platform);
  });

  function reload(platform: string) {
    return Promise.all([
      touch(path.join(workspacePath, `reload.${platform}.lock`)),
      // vscode.window.showInformationMessage(`reloading "${platform}" platform.`),
    ]);
  }

  async function touch(path: string) {
    try {
      const time = new Date();
      await fs.promises.utimes(path, time, time);
    } catch {
      await fs.promises.writeFile(path, "");
    }
  }
}
