import { RpcConnection } from "../../Rpc";
import { AnyInput } from "../Input";
import { InputView } from "../InputView";
import { InputViewClass } from "../tests/WidgetViewTester";
import { RpcTester } from "./testRpc";
import { testWidgetView } from "./testWidgetView";

export type InputViewTester<
  T extends AnyInput,
  V extends InputView<RpcConnection<T>>
> = {};

export function testInputView<T extends AnyInput, VC extends InputViewClass<T>>(
  tester: RpcTester<T>,
  viewClass: VC,
  callback: (tester: InputViewTester<T, InstanceType<VC>>) => void
) {
  testWidgetView(tester, viewClass, t => {
    callback({});
  });
}
