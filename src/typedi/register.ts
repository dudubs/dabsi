import { Resolver } from "@dabsi/typedi/Resolver";

// Object.defineProperty(Function.prototype, Resolver.resolveSymbol, {
//   enumerable: false,
//   writable: true,
//   value(context) {
//     if (this.prototype) {
//       return Resolver.Providability.resolve(this, context);
//     } else {
//       return this(context);
//     }
//   },
// });

// Object.defineProperty(Function.prototype, Resolver.checkSymbol, {
//   enumerable: false,
//   writable: true,
//   value(context) {
//     if (this.prototype) {
//       // is providable/cos
//       Resolver.Providability.check(this, context);
//     }
//   },
// });

if ((() => null).prototype) {
  throw new Error("Engine not support arrow-resolver.");
}
