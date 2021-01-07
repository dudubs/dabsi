import YAML from "yaml";
import watch from "node-watch";
import findParentPathSync from "@dabsi/filesystem/findParentPathSync";
import {
  closeSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
  utimesSync,
} from "fs";
import minimatch from "minimatch";
import path from "path";
import yargs from "yargs";
import { entries } from "@dabsi/common/object/entries";
import { Debounce } from "@dabsi/common/async/Debounce";
import { touchObject } from "@dabsi/common/object/touchObject";

interface Config {
  include?: string[] | string;
  exclude?: string[] | string;

  default?: string;
  categories?: Record<string, string[] | string>;
}
interface ParsedConfig {
  include: RegExp[];
  exclude: RegExp[];
  default: string;

  categories: {
    name: string;
    pattern: RegExp;
  }[];

  rootDir: string;
}

function parseConfig(rootDir: string, config: Config): ParsedConfig {
  const categories: ParsedConfig["categories"] = [];

  function parsePatterns(patterns: string[] | string | undefined) {
    if (typeof patterns === "string") patterns = [patterns];
    return (patterns || []).map(p => minimatch.makeRe(p));
  }

  for (const [name, patterns] of entries(config.categories)) {
    for (const pattern of parsePatterns(patterns)) {
      categories.push({ name, pattern });
    }
  }

  return {
    rootDir,
    include: parsePatterns(config.include),
    exclude: parsePatterns(config.exclude),
    categories,
    default: config.default || "server",
  };
}

export function findFilesSync(
  dir: string,
  deeper: (path: string, baseName: string) => boolean
) {
  return find(dir);

  function* find(dir: string) {
    for (const baseName of readdirSync(dir)) {
      const fileName = path.join(dir, baseName);

      yield fileName;
      if (statSync(fileName).isDirectory() && deeper(fileName, baseName)) {
        yield* find(fileName);
      }
    }
  }
}

function* findWatchPathsSync(
  config: ParsedConfig,
  dir: string
): IterableIterator<string> {
  for (const baseName of readdirSync(dir)) {
    const fileName = path.join(dir, baseName);
    if (config.exclude.find(p => p.test(fileName))) {
      continue;
    }
    if (config.include.find(p => p.test(fileName))) {
      yield fileName;
    }
    if (statSync(fileName).isDirectory()) {
      yield* findWatchPathsSync(config, fileName);
    }
  }
}

export default async function (args) {
  const {} = yargs.parse(args);
  const configFileName = findParentPathSync(realpathSync("."), "watch.yml", s =>
    s.isFile()
  );
  if (!configFileName) {
    console.error("No watch config file");
    return;
  }
  const config = parseConfig(
    path.dirname(configFileName),
    YAML.parse(readFileSync(configFileName, "utf8"))
  );

  const debounceMap: Record<string, ReturnType<typeof Debounce>> = {};

  const eventsDir = path.join(config.rootDir, ".watch");
  mkdirSync(eventsDir, { recursive: true });
  for (const watchPath of findWatchPathsSync(config, config.rootDir)) {
    console.log("watching: " + watchPath);
    watch(watchPath, { recursive: true }, async (_, changePath) => {
      if (!changePath) return;
      for (const category of config.categories) {
        if (category.pattern.test(changePath)) {
          emitSync(category.name, changePath);
          return;
        }
      }
      emitSync(config.default, changePath);
    });
  }

  async function emitSync(name: string, changePath: string) {
    const debounce = touchObject(debounceMap, name, () => Debounce(100));
    if (!(await debounce())) return;
    console.info(`${name} change: ${changePath}`);
    // touchSync(path.join(eventsDir, name));
  }
}

function touchSync(path: string) {
  const time = new Date();
  try {
    utimesSync(path, time, time);
  } catch (err) {
    closeSync(openSync(path, "w"));
  }
}
