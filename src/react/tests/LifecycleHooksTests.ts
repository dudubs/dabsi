import {Component, createElement, Fragment} from "react";

import * as TestRenderer from "react-test-renderer";
import {Waiter} from "../../common/async/Waiter";
import {assertEvent} from "../../rpc/tests/assertEvent";
import {AfterMount} from "../utils/LifecycleHooks";

const methodWaiter = Waiter<void>();
const propertyWaiter = Waiter<void>();


class A extends Component<any, any> {

    @AfterMount() aMethod() {
        methodWaiter.resolve();
    }

    @AfterMount() get aProperty() {
        propertyWaiter.resolve()
        return "a"
    }


    render() {
        return createElement(Fragment)
    }
}

beforeAll(() => {
    TestRenderer.create(createElement(A));
})
it('method after mount', async () => {
    expect(await methodWaiter.then(() => true))
        .toBeTruthy()
});

it('property after mount', async () => {
    expect(await propertyWaiter.then(() => true)).toBeTruthy();
});
