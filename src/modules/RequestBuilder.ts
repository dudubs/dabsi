import { Resolver, ResolverMap } from "@dabsi/typedi";

export class RequestBuilder {
  readonly context: ResolverMap = {};

  readonly initializers: Resolver<() => Promise<void>>[] = [];

  readonly finalizers: Resolver<() => Promise<void>>[] = [];

  readonly catchers: Resolver<(error: any) => Promise<void>>[] = [];

  // called to cleaners only if callback completed without errors
  readonly cleaners: Resolver<() => Promise<void>>[] = [];

  async process(
    context: ResolverMap,
    callback: (context: ResolverMap) => Promise<void>
  ) {
    context = Resolver.Context.assign(context, this.context);

    for (const initializer of this.initializers) {
      await Resolver.resolve(initializer, context)();
    }

    try {
      await callback(context);
      for (const cleaner of this.cleaners) {
        await Resolver.resolve(cleaner, context)();
      }
    } catch (error) {
      let handledError = false;
      for (const catcher of this.catchers) {
        handledError = true;
        try {
          await Resolver.resolve(catcher, context)(error);
        } catch (_error) {
          error = _error;
          handledError = false;
          continue;
        }
        break;
      }
      if (!handledError) {
        throw error;
      }
    } finally {
      for (const finalizer of this.finalizers) {
        await Resolver.resolve(finalizer, context)();
      }
    }
  }
}

// serverRequest.process
