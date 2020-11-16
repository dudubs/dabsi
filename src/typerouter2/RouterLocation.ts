import { reversed } from "../common/array/reversed";
import { entries } from "../common/object/entries";
import { Lazy } from "../common/patterns/lazy";
import {
  HasKeys,
  IsNever,
  IsUndefined,
  OmitKeys,
  Override,
} from "../common/typings";
import { joinUrl } from "../common/string/joinUrl";
import { inspect } from "../logging/inspect";
import { AnyRouter, Router, RouterAt, RouterType, TRouter } from "./Router";

export type AnyRouterLocation = RouterLocation<TRouter>;

export interface RouterLocation<T extends TRouter> {}
export class RouterLocation<T extends TRouter> {
  static create<T extends TRouter>(router: Router<T>): RouterLocation<T> {
    if (router.params.length)
      throw new Error(`Can't create RouterLocation for ${inspect(this)}.`);
    return new RouterLocation(router, {}, undefined, undefined);
  }
  constructor(
    protected _router: AnyRouter,
    protected _params: any,
    protected _parent: AnyRouterLocation | undefined,
    public name: string | undefined
  ) {}

  @Lazy() get path(): string {
    let path: string = joinUrl(this._parent?.path || "", this.name);
    for (const paramKey of this._router.params) {
      path = joinUrl(path, this._params[paramKey]);
    }
    return path;
  }

  get parent(): T["Parent"] extends TRouter
    ? RouterLocation<T["Parent"]>
    : undefined {
    return this._parent as any;
  }

  get root(): AnyRouterLocation {
    return this._parent?.root || (this as any);
  }

  get router(): Router<T> {
    return this._router as Router<T>;
  }

  get params(): T["Params"] {
    return this._params;
  }

  at<T extends TRouter, K extends keyof T["Children"]>(
    this: RouterLocation<T>,
    key: string & K,
    ...[params]: HasKeys<T["Children"][K]["Params"]> extends false
      ? []
      : [T["Children"][K]["Params"]]
  ): RouterLocation<RouterType<RouterAt<T, K>>> {
    return <any>(
      new RouterLocation(
        this._router.children[key],
        params || {},
        this as any,
        key
      )
    );
  }

  atStack<T extends TRouter, K extends keyof T["Stack"]>(
    this: RouterLocation<T>,
    key: K
  ): RouterLocation<T["Stack"][K]> {
    throw new Error();
  }

  *getParents(this: AnyRouterLocation) {
    for (let parent = this; parent; parent = parent.parent!) {
      yield parent;
    }
  }

  *getParentsChildren(this: AnyRouterLocation) {
    for (let [name, router] of entries(this._router.children)) {
      if (router.params.length) continue;
      yield new RouterLocation(router, {}, this, name);
    }
  }

  *getChildren(this: AnyRouterLocation): IterableIterator<AnyRouterLocation> {
    for (const [name, router] of entries(this._router.children)) {
      if (!router.params.length) {
        yield new RouterLocation(router, {}, this, name);
      }
    }
  }

  protected *findChildren(
    this: AnyRouterLocation
  ): IterableIterator<AnyRouterLocation> {
    yield* this.getChildren();
    for (let child of this.getChildren()) {
      yield* child.findChildren();
    }
  }

  *findParents(this: AnyRouterLocation) {
    let root: AnyRouterLocation | undefined = undefined;
    let parentRouters = new Set<AnyRouter>();
    for (const parent of this.getParents()) {
      parentRouters.add(parent.router);
      yield (root = parent);
    }
    if (root) {
      for (const child of root.findChildren()) {
        if (!parentRouters.has(child.router)) {
          yield child;
        }
      }
    }
  }

  protected _find(
    locations: Iterable<AnyRouterLocation>,
    router: AnyRouter
  ): AnyRouterLocation | undefined {
    for (const child of locations) {
      if (child.router.isRouterOf(router)) {
        return child as AnyRouterLocation;
      }
    }
  }

  find<T extends TRouter>(
    this: AnyRouterLocation,
    router: Router<T>
  ):
    | RouterLocation<Override<T, Pick<TRouter, "Parent" | "Stack">>>
    | undefined {
    return this._find(this.findParents(), router) as any;
  }
}
