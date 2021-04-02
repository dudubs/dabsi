import { ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import yargs from "yargs";
import { CliCommandMetadata } from "./CliCommandMetadata";

export class CliMetadata {
  static map = new WeakMap<ModuleTarget, CliMetadata>();

  static get(target: ModuleTarget): CliMetadata {
    return this.map.touch(target, () => new CliMetadata());
  }

  commandMap = new Map<string, CliCommandMetadata>();

  argumentBuilders: ((y: yargs.Argv<any>) => yargs.Argv<any>)[] = [];

  argumentPropertyNames = new Set<string>();

  getCommand(name: string) {
    return this.commandMap.touch(name, () => new CliCommandMetadata(name));
  }
}
