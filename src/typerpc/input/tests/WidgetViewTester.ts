import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import * as TestRenderer from "react-test-renderer";
import { ReactTestRenderer, ReactTestRendererJSON } from "react-test-renderer";
import { Timeout } from "../../../common/async/Timeout";
import { defined } from "../../../common/object/defined";
import { IndexedSeq } from "../../../immutable2";
import { ReactHook } from "../../../react/utils/ReactHook";
import { RpcConnection } from "../../Rpc";
import { AnyWidget, AnyWidgetConnection } from "../../widget/Widget";
import { WidgetView, WidgetViewProps } from "../../widget/WidgetView";
import { AnyInput, AnyInputConnection, InputData, InputError } from "../Input";
import { InputView, InputViewProps } from "../InputView";
import { AbstractReactTester } from "./AbstractReactTester";
import { CaseTester } from "./CaseTester";

type WidgetViewClass<T extends AnyWidget> = new (
  props: WidgetViewProps<RpcConnection<T>>
) => WidgetView<RpcConnection<any>>;

type InputViewClass<T extends AnyInput> = new (
  props: InputViewProps<RpcConnection<T>>
) => InputView<any>;

export class WidgetViewTester<
  T extends AnyWidget,
  VC extends WidgetViewClass<T>,
  C extends AnyWidgetConnection = RpcConnection<T>,
  V extends WidgetView<C> = InstanceType<VC>
> extends AbstractReactTester {
  constructor(public viewClass: VC, public connection: C) {
    super();
  }

  view: V;

  tester: ReactTestRenderer;

  test(title: string, callback: () => void);
  test(callback: () => void);
  test(titleOrCallback, maybeCallback?) {
    let callback;

    if (maybeCallback) {
      callback = () => {
        it(titleOrCallback, maybeCallback);
      };
    } else {
      callback = titleOrCallback;
    }

    this.testProps.test((render) => {
      beforeEach(async () => {
        this.tester = TestRenderer.create(
          render(this.viewClass, {
            connection: this.connection,
            element: await this.connection.getElement(),
          })
        );
        await Timeout(0);
        this.view = defined(
          this.tester.root.findByType(this.viewClass),
          "No view"
        ).instance;
      });

      afterEach(async () => {
        this.tester.unmount();
        await Timeout(0);
      });

      callback();
    });
  }

  testProps = CaseTester<
    (View: VC, props: WidgetViewProps<RpcConnection<T>>) => ReactElement
  >("props");

  testPropsWithState<S>(
    title: string,
    initState: S,
    render: (
      View: VC,
      props: WidgetViewProps<RpcConnection<T>>,
      state: S
    ) => ReactElement,
    callback: (p: Dispatch<SetStateAction<S>>) => void
  ) {
    let state, setState;

    this.testProps(
      title,
      (View, props) =>
        ReactHook(() => {
          [state, setState] = useState(initState);
          return render(View, props, state);
        }),
      () => {
        beforeEach(() => {
          state = initState;
          setState = undefined;
        });
        callback((...args) => {
          setState(...args);
        });
      }
    );
  }

  json(): IndexedSeq<ReactTestRendererJSON> {
    return IndexedSeq.of(this.tester.toJSON()).flatMap(function* callback(obj) {
      if (!obj) return;

      yield obj;
      for (let child of obj.children || []) {
        if (typeof child === "object") {
          yield* callback(obj);
        }
      }
    });
  }

  async act<T>(callback: () => T, afterCallback?: (value: T) => void) {
    const value = await callback();
    await Timeout(0);
    await afterCallback?.(value);
  }

  testAct<T>(
    title: string,
    callback: () => T,
    afterCallback: (value: T) => void
  ) {
    this.test(() => {
      it(title, () => this.act(callback, afterCallback));
    });
  }

  getStringById(id: string) {
    return this.root.findByProps({ id }).children.join();
  }

  testInputError<T extends AnyInput>(
    this: WidgetViewTester<T, InputViewClass<T>>,
    error: InputError<T>,
    callback: () => void
  ) {
    this.test(`inputError:${JSON.stringify(error)}`, async () => {
      await this.act(() => this.view.setError(error));
      await callback();
    });
  }

  testValidInputData<
    T extends AnyInput,
    V extends InputView<AnyInputConnection>
  >(
    this: WidgetViewTester<T, InputViewClass<T>>,
    callback: (data: InputData<T>) => void
  ) {
    this.test(() => {
      it("validInputData", async () => {
        const data = await this.getValidInputData();
        await callback(data);
      });
    });
  }

  async getValidInputData<
    T extends AnyInput,
    V extends InputView<AnyInputConnection>
  >(
    this: WidgetViewTester<T, InputViewClass<T>>
  ): Promise<InputData<RpcConnection<T>>> {
    const [isValidData, data] = await this.view.getCheckedData();
    if (!isValidData) throw new Error(`Unexpected input error`);
    return data;
  }
}
