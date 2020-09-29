import { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";

export abstract class AbstractReactTester {
  abstract tester: ReactTestRenderer;

  get root(): ReactTestInstance {
    return this.tester.root;
  }
}
