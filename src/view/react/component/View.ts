import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import { Component, ReactNode } from "react";

export abstract class View<P = {}> extends Component<P, object> {
  abstract renderView(): ReactNode;

  isDidMount = false;

  isWillUnmount = false;

  state: {} = {};

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
