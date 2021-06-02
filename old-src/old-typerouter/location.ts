import { hasKeys } from "@dabsi/common/object/hasKeys";
import { entries } from "@dabsi/common/object/entries";
import Lazy from "@dabsi/common/patterns/Lazy";
import { joinUrl } from "@dabsi/common/string/joinUrl";
import { HasKeys } from "@dabsi/common/typings2/boolean";
import { Override } from "@dabsi/common/typings2/Override";
import { inspect } from "@dabsi/logging/inspect";
import { Emitter } from "@dabsi/view/react/reactor/useEmitter";
import {
  AnyRouter,
  Router,
  RouterAt,
  RouterType,
  TRouter,
} from "@dabsi/typerouter/router";
import { RouterViewEvent } from "@dabsi/typerouter/event";

export type AnyRouterLocation = RouterLocation<TRouter>;

export interface RouterLocation<T extends TRouter> {}

export class RouterLocation<T extends TRouter> {
  static create<T extends TRouter>(
    router: Router<T>,
    emit: Emitter
  ): RouterLocation<T> {
    if (router.params.length)
      throw new Error(`Can't create RouterLocation for ${inspect(this)}.`);
    return new RouterLocation(router, {}, undefined, undefined, emit);
  }

  constructor(
    protected _router: AnyRouter,
    protected _params: any,
    protected _parent: AnyRouterLocation | undefined,
    public name: string | undefined,
    public emit: Emitter
  ) {
    if (!_router.params.length) {
      if (hasKeys(_params)) {
        throw new Error(
          `No expected to params (${_router.params.join(", ")}).`
        );
      }
    } else {
      if (!hasKeys(_params)) {
        _router.params.forEach(param => {
          if (_params?.[param] == null) {
            throw new Error(`Expect to "${param}" parameter.`);
          }
        });
      }
    }
  }

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

  push() {
    this.emit(RouterViewEvent, { type: "push", location: this });
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
        key,
        this.emit
      )
    );
  }

  atStack<T extends TRouter, K extends keyof T["Stack"]>(
    this: RouterLocation<T>,
    key: K
  ): RouterLocation<T["Stack"][K]> {
    if (this.name === key) return <any>this;
    if (this.parent) return this.parent.atStack(key);
    throw new Error(`No "${key}" at stack`);
  }

  *getParents(this: AnyRouterLocation) {
    for (let parent = this; parent; parent = parent.parent!) {
      yield parent;
    }
  }

  find<T extends TRouter>(
    this: AnyRouterLocation,
    router: Router<T>
  ): RouterLocation<T> | undefined {
    const exclude = new Set();

    const down = (parent: AnyRouterLocation) => {
      if (!exclude.touch(parent)) return;
      const children: AnyRouterLocation[] = [];
      for (const [childKey, childRouter] of entries(parent.router.children)) {
        if (childRouter.params.length) continue;
        const child = parent.at(childKey, {});
        if (childRouter.isRouterOf(router)) return child;
        children.push(child);
      }
      for (const child of children) {
        const subChild = down(child);
        if (subChild) return subChild;
      }
    };

    for (const parent of this.getParents()) {
      if (parent.router.isRouterOf(router)) return <any>parent;
    }

    for (const parent of this.getParents()) {
      const child = down(parent);
      if (child) return child;
    }
  }

  protected _find(
    locations: Iterable<AnyRouterLocation>,
    router: AnyRouter
  ): AnyRouterLocation | undefined {
    // TODO: up, down, up-down
    for (const child of locations) {
      if (child.router.isRouterOf(router)) {
        return child as AnyRouterLocation;
      }
    }
  }
}
