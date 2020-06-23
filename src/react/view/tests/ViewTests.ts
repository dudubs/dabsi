import {is} from "immutable";
import {Component, ComponentClass, ComponentProps, ComponentType, createElement, Fragment} from "react";
import {BeforeRenderView, View} from "../View";
import * as TestRenderer from "react-test-renderer";
import {ViewState} from "../ViewState";

export function testComponentInstance<T extends ComponentClass<any, any>>(
    componentClass: T,
    props: ComponentProps<T>
): InstanceType<T> {
    return <any>TestRenderer.create(createElement(componentClass, props))
        .getInstance()
}

let counter = 0;


export class TestView extends View {


    @BeforeRenderView()
    get beforeRenderProp() {
        return counter++;
    }

    renderView(): React.ReactNode {
        return createElement(Fragment)
    }
}

it('', () => {
    const instance = testComponentInstance(TestView,{});

    const {beforeRenderProp} = instance;

    expect(instance.beforeRenderProp).toEqual(beforeRenderProp,);
    instance.render();
    expect(instance.beforeRenderProp).toBeGreaterThan(beforeRenderProp);

})
