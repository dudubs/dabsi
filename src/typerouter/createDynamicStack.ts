import {
  cloneElement,
  createElement,
  Fragment,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { WeakId } from "../common/WeakId";
import { TReactRouter } from "./ReactRouter";
import { Router } from "./Router";

export type DynamicStack = {
  push(element: ReactElement): () => void;
};

export function createDynamicStack(router: Router<TReactRouter>): DynamicStack {
  let update: () => void;
  const elements = new Set<ReactElement>();

  router.wrap(({ children }) =>
    createElement(Fragment, null, createElement(Component), children)
  );

  return {
    push(element) {
      elements.add((element = cloneElement(element, { key: WeakId(element) })));
      update();
      return () => {
        elements.delete(element);
        update();
      };
    },
  };

  function Component() {
    const [count, setCount] = useState(0);
    update = () => {
      setCount(count + 1);
    };
    useEffect(() => {
      return () => {
        elements.clear();
      };
    }, []);
    return createElement(Fragment, null, [...elements]);
  }
}
