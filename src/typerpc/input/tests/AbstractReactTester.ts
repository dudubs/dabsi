import { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";

export abstract class AbstractReactTester {
  abstract rendererTester: ReactTestRenderer;

  getStringById(id: string) {
    return this.root.findByProps({ id }).children.join();
  }

  get root(): ReactTestInstance {
    return this.rendererTester.root;
  }
}
