import { Component, ReactElement } from "react";

export class ErrorCatcher<T> extends Component<{
  onError: (error: T) => void;
  children: ReactElement;
}> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(<any>error);
  }

  render() {
    return this.props.children;
  }
}
