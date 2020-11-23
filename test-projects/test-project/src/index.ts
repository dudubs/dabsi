import { BrowserPlatform } from "@dabsi/modules/BrowserPlatform";
import { Module } from "@dabsi/typedi/Module";

@Module({
  dependencies: [BrowserPlatform],
})
export class TestProject {}
