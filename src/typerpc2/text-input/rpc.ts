import { Input, inputValueElementToData } from "@dabsi/typerpc2/input/Input";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";

@RpcWithConfig()
export class TextInput extends Input<
  string,
  string,
  "TOO_LONG" | "TOO_SHORT",
  { pattern?: string }
> {
  [inputValueElementToData](element: string): string {
    return element;
  }
}

/*

ObjectInput({

    text: TextInput.withCustomError<>().withValueAdapter<>()

})

$load: value=> ....

$check: x

$config: ...

*/
