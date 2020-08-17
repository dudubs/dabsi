import {ReactNode} from "react";
import {View} from "../react/view/View";
import {ViewState} from "../react/view/ViewState";

export abstract class AbstractFormTextFieldView extends View {

    @ViewState() text: string;

    abstract renderView(): ReactNode;
}
