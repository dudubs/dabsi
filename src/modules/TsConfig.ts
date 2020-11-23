import { CompilerOptions } from "typescript";

export type TsConfig = {
  compilerOptions?: CompilerOptions;
  include?: string[];
  exclude?: string[];
};

export function mergeTsConfig(source: TsConfig, target: TsConfig) {
  return {
    ...source,
    ...target,
    compilerOptions: {
      ...source.compilerOptions,
      ...target.compilerOptions,
      paths: {
        ...source.compilerOptions?.paths,
        ...target.compilerOptions?.paths,
      },
    },
  };
}
