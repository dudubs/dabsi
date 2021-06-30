import React from "react";

export class ReactHookableComponent<P> {
  protected _after: ReactHookableComponent<P>[] = [];
  protected _before: ReactHookableComponent<P>[] = [];

  protected _wrappers: ((
    element: React.ReactElement,
    props: P
  ) => React.ReactElement)[] = [];

  constructor(readonly renderer: (props: P) => React.ReactElement) {}

  after(renderer: (props: P) => React.ReactElement): ReactHookableComponent<P> {
    const child = new ReactHookableComponent<P>(renderer);
    this._after.push(child);
    return child;
  }

  before(
    renderer: (props: P) => React.ReactElement
  ): ReactHookableComponent<P> {
    const child = new ReactHookableComponent<P>(renderer);
    this._before.push(child);
    return child;
  }

  wrap(wrapper: (element: React.ReactElement, props: P) => React.ReactElement) {
    this._wrappers.push(wrapper);
  }

  render(props: P) {
    let element = React.createElement(
      React.Fragment,
      null,
      ...this._before.map(hc => hc.render(props)),
      this.renderer(props),
      ...this._after.map(hc => hc.render(props))
    );

    for (const wrapper of this._wrappers) {
      element = wrapper(element, props);
    }

    return element;
  }

  readonly compoent = (props: P) => this.render(props);
}
