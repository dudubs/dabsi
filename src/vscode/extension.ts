import { activeReloadEmitter } from "./activeReloadEmitter";
import vscode from "vscode";
export async function activate() {
  activeReloadEmitter();
}
