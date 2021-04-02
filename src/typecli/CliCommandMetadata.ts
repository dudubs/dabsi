import { ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import yargs from "yargs";

export class CliCommandMetadata {
  constructor(public name: string) {}

  propertyNames = new Set<string>();

  builders: ((y: yargs.Argv<{}>) => yargs.Argv<any>)[] = [];
}
