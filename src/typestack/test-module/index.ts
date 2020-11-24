import { ProjectProvider } from "../../modules/ProjectProvider";
import { Module } from "../../typedi/Module";

@Module({
  providers: [ProjectProvider()],
})
export class TestFrameworkModule {}
