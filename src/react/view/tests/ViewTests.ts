import {ComponentClass, ComponentProps, createElement, Fragment} from "react";
import * as TestRenderer from "react-test-renderer";
import {OnRenderView, View} from "../View";

export function testComponentInstance<T extends ComponentClass<any, any>>(
    componentClass: T,
    props: ComponentProps<T>
): InstanceType<T> {
    return <any>TestRenderer.create(createElement(componentClass, props))
        .getInstance()
}

let counter = 0;

export class TestView extends View {


    @OnRenderView()
    get beforeRenderProp() {
        return counter++;
    }

    renderView(): React.ReactNode {
        return createElement(Fragment)
    }
}


testm(__filename, () => {

    it('', () => {
        const instance = testComponentInstance(TestView, {});

        const {beforeRenderProp} = instance;

        expect(instance.beforeRenderProp).toEqual(beforeRenderProp,);
        instance.render();
        expect(instance.beforeRenderProp).toBeGreaterThan(beforeRenderProp);

    })

});


