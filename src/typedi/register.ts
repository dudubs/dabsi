import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";

declare global {
  interface String extends CustomResolver<string> {}

  interface Number extends CustomResolver<number> {}

  interface Boolean extends CustomResolver<boolean> {}

  interface Date extends CustomResolver<Date> {}
}

[String, Number, Boolean, Date].forEach(type => {
  Object.defineProperty(type.prototype, Resolver.resolveSymbol, {
    enumerable: false,
    value() {
      return this;
    },
  });
});

Object.defineProperty(Function.prototype, Resolver.resolveSymbol, {
  enumerable: false,
  writable: true,
  value(context) {
    if (this.prototype) {
      return Resolver.resolveType(this, context);
    } else {
      return this(context);
    }
  },
});

Object.defineProperty(Function.prototype, Resolver.checkSymbol, {
  enumerable: false,
  writable: true,
  value(context) {
    if (this.prototype) {
      Resolver.checkType(this, context);
    }
  },
});

if ((() => null).prototype) {
  throw new Error("Engine not support arrow-resolver.");
}
