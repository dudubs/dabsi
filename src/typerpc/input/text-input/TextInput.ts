import { If } from "../../../common/typings2/boolean";
import { Override } from "../../../common/typings2/Override";
import { Input } from "../Input";
import { TextInputHandler } from "./TextInputHandler";
import { TextLoaderError, TextLoaderOptions } from "./TextInputLoader";

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
    props: {
      nullable: nullable || false,
      loaderOptions,
    },
    getValueDataFromElement(value) {
      return value;
    },
  });
}
