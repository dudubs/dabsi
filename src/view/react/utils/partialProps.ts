import { ComponentType, createElement, ReactElement } from "react";
import { PartialKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";

export type WithDefaultProps = {
  <T>(defaultProps: T): <P>(
    component: ComponentType<P & T>
  ) => (props: P & Partial<T>) => ReactElement;

  <P, K extends keyof P>(
    component: ComponentType<P>,
    defaultProps: Pick<P, K>
  ): (props: PartialKeys<P, K>) => ReactElement;

  <P, K extends keyof P>(
    component: ComponentType<P>,
    getDefaultProps: (props: Partial<P>) => Pick<P, K>
  ): (props: PartialKeys<P, K>) => ReactElement;
};

function _partialProps(component, defaultProps, extraDefaultProps?) {
  if (typeof defaultProps === "function") {
    defaultProps = defaultProps(component.defaultProps ?? {});
  }

  if (component.defaultComponent) {
    return _partialProps(component.defaultComponent, defaultProps, {
      ...extraDefaultProps,
      ...component.defaultProps,
    });
  }

  // console.log({component});
  const func = props => {
    return createElement(component, props);
  };

  func.defaultComponent = component;

  func.displayName = component.displayName ?? component.name;

  func.defaultProps = {
    ...extraDefaultProps,
    ...defaultProps,
  };

  return func;
}

export const partialProps: WithDefaultProps = (
  componentOrProps,
  props?
): any => {
  if (props) return _partialProps(componentOrProps, props);
  return component => _partialProps(component, componentOrProps);
};
