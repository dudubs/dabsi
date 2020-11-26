import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";

@Module({
  providers: [ProjectModuleProvider()],
})
export class TestFrameworkModule {}
