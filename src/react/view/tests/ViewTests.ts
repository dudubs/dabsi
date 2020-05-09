import {Component, ComponentProps, ComponentType, createElement, Fragment} from "react";
import {View, ViewState} from "../View";


export function testComponentInstance<T extends new(...args)=>Component<any, any>>(
    componentClass:T,
    props: ComponentProps<T>
) {

}

export class TestView extends View {


    @ViewState() foo;

    // AfterMountView
    // BeforeUnmountView
    // BeforeRenderView

    renderView(): React.ReactNode {
        return createElement(Fragment)
    }
}

it('',()=>{
    testComponentInstance(TestView,{})
})
