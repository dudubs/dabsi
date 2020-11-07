import { RpcError } from "../../Rpc";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  ErrorOrValue,
  InputError,
  InputErrorOrValue,
  InputValue,
  InputValueData,
  TInput,
} from "../Input";
import { NullableInput } from "./NullableInput";

export abstract class AbstractNullableInputHandler<
  T extends NullableInput<any, TInput>
> extends AbstractInputHandler<T> {
  abstract loadAndCheckNotNull(
    valueData: NonNullable<InputValueData<T>>
  ): Promise<ErrorOrValue<InputError<T>, NonNullable<InputValue<T>>>>;

  async loadAndCheck(
    valueData: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    if (valueData == null) {
      if (!this.rpc.nullable) {
        return { error: "NOT_NULLABLE", value: undefined };
      }
      return { value: null };
    }
    const result = await this.loadAndCheckNotNull(valueData);
    if ("error" in result) return result;
    if (result.value == null) {
      if (!this.rpc.nullable) {
        throw new RpcError(`value is null`);
      }
    }
    return result;
  }
}