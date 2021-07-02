import Lazy from "@dabsi/common/patterns/Lazy";
import { Router } from "@dabsi/typerouter";
import { RouterType } from "@dabsi/typerouter/Router";
import {
  RouterAt,
  RouterStackAt,
  RouterValidatePath,
} from "@dabsi/typerouter/RouterPath";
import {
  getRouterViewMetadata,
  RouterViewMatadata,
  RouterViewRenderer,
} from "@dabsi/typerouter/view/RouterViewMetadata";

export default class RouterViewBuilder<T, R extends Router, S> {
  constructor(protected _routerType: RouterType, protected _depth: number) {}

  at<K extends string>(
    pathOrPaths: K | K[],
    callback: RouterValidatePath<
      T,
      K,
      (
        builder: RouterViewBuilder<RouterAt<T, K>, R, S & RouterStackAt<T, K>>
      ) => any
    >
  ): this;

  at(paths, callback) {
    if (typeof paths === "string") {
      paths = [paths];
    }

    for (const path of paths) {
      const pathKeys = path.split(".");

      callback(
        new RouterViewBuilder(
          this._routerType.at(pathKeys),
          this._depth + pathKeys.length
        )
      );
    }

    return this;
  }

  @Lazy() get _metadata(): RouterViewMatadata {
    return getRouterViewMetadata(this._routerType);
  }

  index(renderer: RouterViewRenderer<T, R, S>): this {
    this._metadata.indexRenderer = { renderer, depth: this._depth };
    return <any>this;
  }

  default(renderer: RouterViewRenderer<T, R, S>): this {
    this._metadata.defaultRenderer = { renderer, depth: this._depth };
    return <any>this;
  }

  catch(renderer: RouterViewRenderer<T, R, S>): this {
    this._metadata.errorRenderer = { renderer, depth: this._depth };
    return <any>this;
  }

  wrap(...renderers: RouterViewRenderer<T, R, S>[]): this {
    this._metadata.wrappers.push(
      ...renderers.map(renderer => ({ renderer, depth: this._depth }))
    );
    return <any>this;
  }
}
