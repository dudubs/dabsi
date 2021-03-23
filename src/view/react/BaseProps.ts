import { entries } from "@dabsi/common/object/entries";

export function BaseProps<P>(
  map: Record<keyof Required<P>, true>
): {
  map: Record<keyof Required<P>, true>;
  keys: (keyof Required<P>)[];
  <U extends P>(props: U): Pick<U, keyof P>;

  omit<U extends P>(props: U): [P, Omit<U, keyof P>];
} {
  const keys = (F.keys = Object.keys(map));
  F.map = map;
  F.omit = props => {
    const omitedProps = {};
    const baseProps = {};

    for (const [key, value] of entries(props)) {
      if (map[key]) {
        baseProps[key] = value;
      } else {
        omitedProps[key] = value;
      }
    }
    return [baseProps, omitedProps];
  };
  return F as any;
  function F(props) {
    const baseProps = {};
    for (const key of keys) {
      if (key in props) {
        baseProps[key] = props[key];
      }
    }
    return baseProps;
  }
}
