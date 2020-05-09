import* as TestRenderer from "react-test-renderer";
import {Component, createElement} from "react";
import {State} from "../utils/State";

fit('', () => {
    class A extends Component<any, any> {

        @State() count = 0;

        render() {
            return createElement("test", {
                count: this.count
            })
        }
    }

    TestRenderer.create(createElement(A));
})
