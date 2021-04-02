import { Injectable, Resolver } from "@dabsi/typedi";
import { CliBuilder } from "@dabsi/typecli/CliBuilder";
import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import yargs from "yargs";
import { CliCommandMetadata } from "./CliCommandMetadata";
import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";

declare module "@dabsi/typemodule/ModuleMetadata" {
  interface ModuleOptions {
    cli?: string;
  }
}

@Injectable()
export class CliRunner {
  constructor(protected moduleRunner: ModuleRunner) {}
}
