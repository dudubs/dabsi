import { Input, inputValueElementToData } from "@dabsi/typerpc/input/Input";
import { RpcWithConfig } from "@dabsi/typerpc/RpcConfig";

@RpcWithConfig()
export class TextInput extends Input<
  string,
  string,
  "TOO_LONG" | "TOO_SHORT" | "INVALID_PATTERN",
  {
    pattern?: [source: string, flags: string];
    minLength?: number;
    maxLength?: number;
    trim?: boolean;
  }
> {
  [inputValueElementToData](element: string): string {
    return element;
  }
}
