import { ReactElement } from "react";

type Wrapper = (children: ReactElement) => ReactElement;

export default function ViewWrapper(): {
  (props: { children: ReactElement }): ReactElement;
  push(...wrappers: Wrapper[]);
} {
  const wrappers: Wrapper[] = [];

  Wrapper.push = wrapper => {
    wrappers.push(wrapper);
  };

  return Wrapper;

  function Wrapper({ children }) {
    for (const wrapper of wrappers) {
      children = wrapper(children);
    }
    return children;
  }
}
