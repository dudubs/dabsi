import { mapObject } from "@dabsi/common/object/mapObject";

type WithHooks = {
  <T extends Record<string, () => any>>(hooks: T): {
    <P = {}>(
      render: (
        props: P,
        hooks: { [K in keyof T]: ReturnType<T[K]> }
      ) => React.ReactElement
    ): (props: P) => React.ReactElement;
  };
};

export const withHooks: WithHooks = hooks => {
  return render => {
    return props => render(props, <any>mapObject(hooks, hook => hook()));
  };
};
