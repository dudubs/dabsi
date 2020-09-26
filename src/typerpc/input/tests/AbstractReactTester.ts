import { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";

export abstract class AbstractReactTester {
  abstract tester: ReactTestRenderer;

  getStringById(id: string) {
    return this.root.findByProps({ id }).children.join();
  }

  get root(): ReactTestInstance {
    return this.tester.root;
  }
}
