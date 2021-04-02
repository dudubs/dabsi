import { CliMetadata } from "@dabsi/typecli/CliMetadata";
import yargs from "yargs";

export default ((builder?) => {
  return (target, propertyName: string, _) => {
    const metadata = CliMetadata.get(target.constructor);
    builder && metadata.argumentBuilders.push(builder);
    metadata.argumentPropertyNames.add(propertyName);
  };
}) as {
  (builder?: (y: yargs.Argv<any>) => yargs.Argv<any>): MethodDecorator;
};
