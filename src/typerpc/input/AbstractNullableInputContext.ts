import { RpcError } from "../Rpc";
import { AbstractInputContext } from "./AbstractInputContext";
import { InputCheckResult, InputData, TInput } from "./Input";
import {NullableInput} from "./NullableInput";


export abstract class AbstractNullableInputContext<
  T extends NullableInput<any, TInput>
> extends AbstractInputContext<T> {
  abstract loadAndCheckNotNull(
    data: NonNullable<InputData<T>>
  ): Promise<InputCheckResult<T>>;

  async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
    if (data == null) {
      if (!this.props.nullable) {
        return { error: "REQUIRED", value: undefined };
      }
      return { value: null };
    }
    const result = await this.loadAndCheckNotNull(data);
    if ("error" in result) return result;
    const { value } = result;
    if (value == null) {
      if (!this.props.nullable) {
        throw new RpcError(`Value is null.`);
      }
    }
    return result;
  }
}
