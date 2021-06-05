import { Resolver } from "@dabsi/typedi";
import { ResolverMap } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function use<T>(resolver: Resolver<T>): T;
    function build<T>(builder: () => T): ConsumeResolver<T>;
  }
}

let _state: null | { context: ResolverMap; check: boolean } = null;

Resolver.use = function (resolver): any {
  if (!_state) {
    throw new Error(`Can't use without state.`);
  }
  if (_state.check) {
    Resolver.check(resolver, _state.context);
    return;
  }
  return Resolver.resolve(resolver, _state.context);
};

Resolver.build = function (builder) {
  return Resolver.create<any>(
    context => {
      let lastState = _state;
      _state = { context, check: false };
      try {
        return builder();
      } finally {
        _state = lastState;
      }
    },
    context => {
      let lastState = _state;
      _state = { context, check: true };
      try {
        builder();
      } finally {
        _state = lastState;
      }
    }
  );
};
