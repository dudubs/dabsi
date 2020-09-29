import { Component, ReactNode } from "react";
import { assert } from "../../common/assert";
import { WeakMapFactory } from "../../common/map/mapFactory";
import { Lazy } from "../../common/patterns/lazy";
import { EmptyFragment } from "../utils/EmptyFragment";

export abstract class View<P = {}> extends Component<P, object> {
  abstract renderView(): ReactNode;

  isDidMount = false;

  isWillUnmount = false;

  currentState = {};

  isDidSetState = false;

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
    return this.renderView() ?? EmptyFragment;
  }
}
