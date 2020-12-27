import {
  ComponentProps,
  ComponentType,
  createElement,
  isValidElement,
  ReactElement,
} from "react";
import { _buildObject, ObjectBuilder } from "@dabsi/common/object/buildObject";

export function buildElement<P>(
  element: ReactElement<P>,
  ...builders: ObjectBuilder<P>[]
): ReactElement<P>;
export function buildElement<T extends ComponentType>(
  type: T,
  props: ComponentProps<T> | undefined,
  ...builders: ObjectBuilder<ComponentProps<T>>[]
): ReactElement<ComponentProps<T>, T>;
export function buildElement(typeOrElement, ...args) {
  return _buildElement(typeOrElement, args);
}

export function _buildElement(typeOrElement, args) {
  let type;
  let props;
  let builders;
  if (isValidElement(typeOrElement)) {
    [type, props, builders] = [typeOrElement.type, typeOrElement.props, args];
  } else {
    [type, [props, ...builders]] = [typeOrElement, args];
    if (isValidElement(props)) {
      props = props.props;
    }
  }
  return createElement(type, _buildObject(props, builders));
}
