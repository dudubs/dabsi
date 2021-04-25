// TODO: rename to InputError
import { AnyInput, InputError } from "@dabsi/old-typerpc/input/Input";

export class InputViewError<T extends AnyInput> extends Error {
  constructor(public error: InputError<T>) {
    super();
  }
}
