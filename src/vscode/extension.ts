import vscode from "vscode";

export async function activate() {
  // Promise.all(
  //   (vscode.workspace.workspaceFolders || []).map(folder =>
  //     findSourceDirs(folder.uri)
  //   )
  // ).then(x => {
  //   vscode.window.showErrorMessage(JSON.stringify(x, null, 2));
  // });
  // vscode.window.showErrorMessage(
  //   JSON.stringify(
  //     await findSourceDirs(vscode.workspace.workspaceFolders![0].uri)
  //   )
  // );
  // for (const folder of vscode.workspace.workspaceFolders || []) {
  //   for await (const srcDir of findSourceDirs(folder.uri)) {
  //     for (const srcFile of findSourceFiles(srcDir)) {
  //       srcFile;
  //     }
  //   }
  // }
}

async function* findSourceFiles(uri: vscode.Uri) {
  for (const [name, type] of await vscode.workspace.fs.readDirectory(uri)) {
    const path = vscode.Uri.joinPath(uri, name);
    if (type === vscode.FileType.Directory) {
      yield* findSourceFiles(path);
      continue;
    } else if (type !== vscode.FileType.File) continue;

    if (!/\.tsx?$/i.test(name)) continue;
    yield path;
  }
}
async function* findSourceDirs(uri: vscode.Uri) {
  const srcUri = vscode.Uri.joinPath(uri, "src");
  const srcStat = await vscode.workspace.fs.stat(srcUri);
  if (srcStat.type === vscode.FileType.Directory) {
    yield srcUri;
    return;
  }

  for (const [name, type] of await vscode.workspace.fs.readDirectory(uri)) {
    if (type !== vscode.FileType.Directory) continue;
    if (/^(node_modules|\.)$/.test(name)) continue;
    yield* findSourceDirs(vscode.Uri.joinPath(uri, name));
  }
}
