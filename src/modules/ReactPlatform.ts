import {
  createElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from "react";
import { Module } from "../typedi/Module";

export type ReactPlatformProvider = (children: ReactNode) => ReactElement;

@Module()
export class ReactPlatform {
  protected providers: ReactPlatformProvider[] = [];

  provide(provider: ReactPlatformProvider) {
    this.providers.push(provider);
  }

  createComponent(component): FunctionComponent {
    return props => {
      let children: ReactElement = createElement(component, props);
      for (const provider of this.providers) {
        children = provider(children);
      }
      return children;
    };
  }
}
