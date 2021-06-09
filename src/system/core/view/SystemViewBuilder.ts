import {
  SystemViewComponent,
  SystemViewComponentProps,
} from "@dabsi/system/core/view/SystemView";
import { RpcAt, RpcLocation, RpcType, RpcValidatePath } from "@dabsi/typerpc2";
import { RpcChild } from "@dabsi/typerpc2/RpcHandler";
import RpcPathMap from "@dabsi/typerpc2/RpcPathMap";
import { AnyWidget } from "@dabsi/typerpc2/widget/Widget";
import { Renderer } from "@dabsi/view/react/renderer";
import React from "react";

export default class SystemViewBuilder<T> {
  constructor(
    protected _location: RpcLocation<T> | null,
    protected _map: RpcPathMap<SystemViewComponent<any>>
  ) {}

  for<T>(
    rpcType: RpcType<T>,
    callback: (builder: SystemViewBuilder<T>) => any
  ) {
    callback(new SystemViewBuilder(new RpcLocation(rpcType, []), this._map));
    return this;
  }

  at<K extends string>(
    pathOrPaths: K | K[],
    callback: RpcValidatePath<
      T,
      K,
      (builder: SystemViewBuilder<RpcAt<T, K>>) => any
    >
  ): this;

  at(paths, callback) {
    if (typeof paths === "string") {
      paths = [paths];
    }
    for (const path of paths) {
      callback(new SystemViewBuilder(this._location!.at(path), this._map));
    }
    return this;
  }

  withProps<T extends AnyWidget>(
    this: SystemViewBuilder<RpcChild<T>>,
    getProps: (
      props: SystemViewComponentProps<T>
    ) => SystemViewComponentProps<T>
  ): this {
    const component = this._getComponent();
    this._map.setByLocation(this._location!, props =>
      React.createElement(component, getProps(<any>props))
    );
    return <any>this;
  }

  render<T extends AnyWidget>(
    this: SystemViewBuilder<RpcChild<T>>,
    renderer: Renderer<SystemViewComponentProps<T>>
  ): this;
  render(renderer) {
    this._map.setByLocation(this._location!, props => renderer(props));
    return this;
  }

  wrap<T extends AnyWidget>(
    this: SystemViewBuilder<RpcChild<T>>,
    wrapper: (
      element: React.ReactElement<SystemViewComponentProps<T>>
    ) => React.ReactElement
  ): this {
    const component = this._getComponent();
    this._map.setByLocation(this._location!, props =>
      wrapper(React.createElement<any>(component, props))
    );
    return <any>this;
  }

  protected _getComponent() {
    const component = this._map.getByLocation(this._location!);
    if (!component) {
      throw new Error(`No component for "${this._location}".`);
    }
    return component;
  }
}
