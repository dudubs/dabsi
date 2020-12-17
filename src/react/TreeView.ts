import { createElement } from "react";
import { toIndexedSeq } from "@dabsi/typedata/toIndexedSeq";
import { IndexedSeq } from "@dabsi/immutable2";
import { createUndefinedContext } from "@dabsi/react/utils/hooks/createUndefinedContext";
import { View } from "@dabsi/react/view/View";

export const TreeViewContext = createUndefinedContext<TreeView>();

export abstract class TreeView<P = any> extends View<P> {
  static contextType = TreeViewContext;

  context: TreeView | undefined;

  children = new Set<TreeView>();

  componentDidMount() {
    super.componentDidMount();
    this.context?.mountChild(this);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.context?.unmountChild(this);
  }

  mountChild(child: TreeView) {
    this.children.add(child);
  }

  unmountChild(child: TreeView) {
    this.children.delete(child);
  }

  parents(): IndexedSeq<TreeView> {
    return toIndexedSeq<TreeView>(this, view => view.context);
  }

  allChildren() {
    return IndexedSeq.of(this).flatMap(function flat(child) {
      return IndexedSeq.of(child).concat(
        IndexedSeq(child.children).flatMap(flat)
      );
    });
  }

  render() {
    return createElement(TreeViewContext.Provider, {
      value: this,
      children: super.render(),
    });
  }
}
