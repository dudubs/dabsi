import { realpathSync } from "fs";
import path from "path";
import { checkSymbol } from "./internal/_check";
import { StackLastLine } from "./getStackLastLine";
import { resolveSymbol } from "./internal/_resolve";
import { Context, CustomResolver, Resolver } from "./Resolver";
import { ResolveError } from "./ResolveError";
let count = 0;
export function creatTokenResolver(name: string, stack: Error) {
  return Object.setPrototypeOf(
    { token: `token:${count++}_${name}`, stack },
    AnyTokenResolver
  );
}
export type TokenResolver<T> = CustomResolver<T> & {
  token: string;
  stack?: StackLastLine;
  provide(value: Resolver<T>): Context<T>;
};
export const AnyTokenResolver: TokenResolver<any> = {
  provide(resolver) {
    return { [this.token]: resolver };
  },
  get token(): string {
    throw new Error("No token");
  },
  get stack(): any {
    throw new Error("No stack");
  },
  [resolveSymbol](context) {
    return context[this.token][resolveSymbol]();
  },
  [checkSymbol](context) {
    if (!(this.token in context)) {
      const { sourceFileName, lineNumber, column, line } = this.stack!();

      throw new ResolveError(
        `Can't resolve ${this.token}${
          line &&
          `: at ${path.relative(
            realpathSync("."),
            sourceFileName
          )}:${lineNumber}:\n\t ${line.trim()}`
        }`
      );
    }
  },
};
