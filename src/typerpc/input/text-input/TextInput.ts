import { If } from "@dabsi/common/typings2/boolean";
import { Override } from "@dabsi/common/typings2/Override";
import { Input } from "@dabsi/typerpc/input/Input";
import { TextInputHandler } from "@dabsi/typerpc/input/text-input/TextInputHandler";
import {
  TextLoaderError,
  TextLoaderOptions,
} from "@dabsi/typerpc/input/text-input/TextInputLoader";

// TODO: Builtin unique error, & error override.
export type TextInput<N extends boolean = any> = Input<{
  Error: TextLoaderError;

  ValueData: string;

  Value: string | If<N, null>;

  ValueElement: string;

  ValueConfig: string | undefined;

  Props: {
    nullable: boolean;
    loaderOptions: TextLoaderOptions;
  };

  Config: undefined | TextLoaderOptions;

  Controller: {};

  Element: Override<
    TextLoaderOptions,
    {
      pattern?: string;
    }
  >;
}>;

export function TextInput<N extends boolean = false>({
  nullable,
  ...loaderOptions
}: {
  nullable?: N;
} & TextLoaderOptions = {}): TextInput<N> {
  return <any>Input<TextInput<any>>({
    handler: TextInputHandler,
    type: TextInput,
    isConfigCanBeUndefined: true,
    props: {
      nullable: nullable || false,
      loaderOptions,
    },
    getValueDataFromElement(value) {
      return value;
    },
  });
}
