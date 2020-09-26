import { Component, ReactNode } from "react";
import { assert } from "../../common/assert";
import { WeakMapFactory } from "../../common/map/mapFactory";
import { Lazy } from "../../common/patterns/lazy";
import { EmptyFragment } from "../utils/EmptyFragment";

export const getViewMetadataBuilders = WeakMapFactory(() =>
  Array<(metadata: ViewMetadata) => void>()
);

export class ViewMetadata {
  renderProperties = new Set<string>();
  renderMethods = new Set<string>();
}

export const getViewMetadata = WeakMapFactory(
  (view: View<any>): ViewMetadata => {
    const metadata = new ViewMetadata();
    for (; view !== View.prototype; view = Object.getPrototypeOf(view)) {
      for (const builder of getViewMetadataBuilders(view)) {
        builder(metadata);
      }
    }
    return metadata;
  }
);

export function OnRenderView() {
  return function (target: View<any>, key: string, desc: PropertyDescriptor) {
    assert(typeof (desc.get || desc.value) === "function");

    desc.get && Lazy()(target, key, desc);

    getViewMetadataBuilders(target).push((metadata) => {
      if (desc.get) {
        metadata.renderProperties.add(key);
      } else {
        metadata.renderMethods.add(key);
      }
    });
  };
}

export abstract class View<P = {}> extends Component<P, any> {
  abstract renderView(): ReactNode;

  isDidMount = false;

  isWillUnmount = false;

  currentState = {};

  isDidSetState = false;

  protected viewMetadata: ViewMetadata = getViewMetadata(
    Object.getPrototypeOf(this)
  );

  componentDidMount() {
    this.isDidMount = true;
  }

  componentWillUnmount() {
    this.isWillUnmount = true;
  }

  updateViewProps?(prevProps: Readonly<P>, nextProps: Readonly<P>): void;

  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<any>,
    nextContext: any
  ): boolean {
    if (this.updateViewProps) {
      this.updateViewProps(this.props, nextProps);
      if (this.isDidSetState) return false;
    }

    return true;
  }

  render() {
    for (const key of this.viewMetadata.renderProperties) {
      Lazy.delete(this, key);
    }
    for (const method of this.viewMetadata.renderMethods) {
      this[method]();
    }
    return this.renderView() ?? EmptyFragment;
  }
}
