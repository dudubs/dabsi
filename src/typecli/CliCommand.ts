import { CliMetadata } from "@dabsi/typecli/CliMetadata";
import yargs from "yargs";

export default ((commandName, builder?) => {
  return (target, propertyName: string, _) => {
    const metadata = CliMetadata.get(target.constructor).getCommand(
      commandName
    );

    metadata.propertyNames.add(propertyName);
    builder && metadata.builders.push(builder);
  };
}) as {
  (
    name: string,
    builder?: (y: yargs.Argv<{}>) => yargs.Argv<any>
  ): MethodDecorator;
};
