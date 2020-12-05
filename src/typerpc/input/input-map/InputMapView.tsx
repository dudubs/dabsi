import * as React from "react";
import {
  ComponentType,
  createContext,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { mapObject } from "../../../common/object/mapObject";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { Renderer } from "../../../react/renderer";
import { RpcChildren, RpcConnection } from "../../Rpc";
import { AbstractInputView } from "../AbstractInputView";
import { BasedInput, InputType } from "../Input";
import { InputViewProps } from "../InputView";
import { InputViewChildren } from "../InputViewChildren";
import { AnyInputMap } from "./InputMap";

export type AnyInputMapConnection = RpcConnection<AnyInputMap>;

export type BasedInputMap = BasedInput<InputType<AnyInputMap>>;

export class InputMapView<
  C extends RpcConnection<AnyInputMap>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(
      getProps: <K extends keyof C["map"]>(
        key: string & K
      ) => InputViewProps<C["map"][K]>,
      view: InputMapView<C>
    ): ReactNode;
  }
> {
  children = new InputViewChildren();

  getProps<K extends keyof C["map"]>(
    key: string & K
  ): InputViewProps<C["map"][K]> {
    return {
      key,
      mapKey: key,
      connection: this.connection.map[key],
      element: this.element.elementMap[key],
      elementState: undefined,
      onElementStateChange: undefined,
      value: this.value?.[key],
      onError: view => this.props.onError?.(this),
      onChange: view =>
        this.setValue({
          ...this.value,
          [key]: view.value,
        }),
      inputRef: this.children.ref(key),
    } as InputViewProps<C["map"][K]>;
  }

  renderView(): React.ReactNode {
    return this.props.children(this.getProps.bind(this), this);
  }
}

export const InputMapTheme = {
  renderContainer: (element: ReactElement) => <>{element}</>,
  renderField: (element: ReactElement, key: string) => <>{element}</>,
};
export const InputMapThemeContext = createContext(InputMapTheme);

export function InputMapThemeProvider({ children, theme: getTheme }) {
  const theme = useContext(InputMapThemeContext);
  const nextTheme = useMemo(() => getTheme(theme), [theme]);
  return (
    <InputMapThemeContext.Provider value={nextTheme}>
      {children}
    </InputMapThemeContext.Provider>
  );
}

export namespace InputMapView {
  export type FieldsProps<
    C extends AnyInputMapConnection
  > = InputViewProps<C> & {
    fields: {
      [K in string & keyof C["map"]]: Renderer<InputViewProps<C["map"][K]>>;
    };
    children?: Renderer<{
      fields: Record<string & keyof C["map"], ReactElement>;
      view: InputMapView<C>;
    }>;
  };

  export function Fields<C extends AnyInputMapConnection>({
    children,
    fields: keyToRenderer,
    ...props
  }: FieldsProps<C>) {
    const theme = useContext(InputMapThemeContext);
    return theme.renderContainer(
      <InputMapView
        {...props}
        children={(getProps, view) => {
          if (typeof children === "function") {
            return children({
              view,
              fields: mapObject(keyToRenderer, (render, key) => {
                return createElement(
                  Fragment,
                  { key },
                  render(getProps(key) as any)
                );
              }),
            });
          }
          return mapObjectToArray(
            keyToRenderer,
            (render: Renderer<any>, key) => {
              return (
                <Fragment key={key}>
                  {theme.renderField(render(getProps(key) as any), key)}
                </Fragment>
              );
            }
          );
        }}
      />
    );
  }
}
