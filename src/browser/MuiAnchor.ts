import { MenuProps } from "@material-ui/core/Menu";
import React from "react";

export default class MuiAnchor<T = any> extends React.Component<{
  children(anchor: MuiAnchor<T>);
}> {
  anchorEl: T | null = null;

  state = { open: false };

  get buttonProps(): {
    onClick(): void;
    ref: React.Ref<T>;
  } {
    return {
      ref: anchorEl => {
        this.anchorEl = anchorEl! as any;
      },
      onClick: () => {
        this.setState(state => ({ ...state, open: true }));
      },
    };
  }

  get menuProps(): MenuProps {
    return {
      open: this.state.open,
      anchorEl: () => this.anchorEl! as any,
      onClick: () => {
        this.setState(state => ({ ...state, open: false }));
      },
    };
  }

  render() {
    return this.props.children(this);
  }
}
