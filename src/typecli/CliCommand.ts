import { CliMetadata } from "@dabsi/typecli/CliMetadata";
import yargs from "yargs";

export default ((commandName, declOrBuilder?, maybeBuilder?) => {
  let decl;
  let builder;

  if (typeof declOrBuilder === "string") {
    [decl, builder] = [declOrBuilder, maybeBuilder];
  } else {
    builder = declOrBuilder;
  }

  return (target, propertyName: string, _) => {
    const metadata = CliMetadata.get(target.constructor).getCommand(
      commandName
    );

    metadata.propertyNames.add(propertyName);
    builder && metadata.builders.push(builder);
    decl && metadata.declarations.push(decl);
  };
}) as {
  (
    name: string,
    builder?: (y: yargs.Argv<{}>) => yargs.Argv<any>
  ): MethodDecorator;

  (
    name: string,
    decl: string,
    builder?: (y: yargs.Argv<{}>) => yargs.Argv<any>
  ): MethodDecorator;
};
