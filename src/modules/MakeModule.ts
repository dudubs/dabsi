import fs, { existsSync, realpathSync } from "fs";
import { basename, dirname, join, relative, resolve } from "path";
import { DABSI_PATH } from "../index";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { ProjectModule } from "../typestack/ProjectModule";
import { Cli, CliError } from "./Cli";
import { relativePosixPath } from "./pathHelpers";
import { TsConfig } from "./TsConfig";

@Module()
export class MakeModule {
  cli = new Cli().push({
    run: () => {
      if (this.projectModule.path === DABSI_PATH)
        throw new CliError(`You can't run make on "${DABSI_PATH}".`);
      return this.make();
    },
  });

  constructor(
    @Inject() cli: Cli,
    @Inject() protected projectModule: ProjectModule
  ) {
    cli.connect("make", this.cli);
  }

  async makeTsConfigWithPaths(outDir: string) {
    // if (outDir === DABSI_PATH) return;
    const paths = [...this.projectModule.paths.filter(path => path !== outDir)];

    const configPaths = {};
    const registerPaths = [];

    for (let path of paths) {
      const name = basename(path);

      if (path !== this.projectModule.path) {
        configPaths["@" + name + "/*"] = [
          relativePosixPath(outDir, join(path, "src")) + "/*",
        ];
      }
    }
    await this.makeJsonFile(join(outDir, "tsconfig.json"), {
      compilerOptions: {
        baseUrl: ".",
        paths: configPaths,
      },
      include: [
        "./src",
        ...registerPaths,
        // ...paths
        //   .toSeq()
        //   .map(path =>
        //     posixRelativePath(outDir, resolve(path, "src", "register.ts"))
        //   ),
      ],
    });
  }

  protected async make() {
    await this.makeTsConfigWithPaths(this.projectModule.path);

    console.log(this.projectModule.tsConfigInfo);
  }

  async makeTsConfigPath(path: string, tsConfig: TsConfig) {
    if (existsSync(path)) {
      try {
        await fs.promises.readFile(path, "utf-8");
      } catch (error) {}
    }
  }

  async makeFile(path, data: string) {
    // await fs.promises.mkdir(dirname(path), { recursive: true });
    // console.log(`make "${path}".`);
    // console.log(("\n" + data).replace(/\n/g, "\n  ").replace(/\n/, ""));
  }

  async makeJsonFile(path, data: any) {
    await this.makeFile(path, JSON.stringify(data, null, 2));
  }
}
