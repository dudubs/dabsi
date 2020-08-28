import {Awaitable} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {AfterMountView, BeforeUnmountView, View} from "../../react/view/View";
import {WidgetViewProps} from "../WidgetView";
import {AnyInput, InputType} from "./Input";


export type InputViewProps<T extends AnyInput> = WidgetViewProps<T> & {


    onChange?(data: InputType<T>['Data']): void;

    inputRef?: (input: InputView<T> | null) => void;

    error?: InputType<T>['Error'];

};

export type InputViewRenderer<T extends AnyInput> =
    Renderer<InputViewProps<T>>;

export abstract class InputView<T extends AnyInput,
    P extends InputViewProps<T> = InputViewProps<T>>
    extends View<P> {

    abstract getValidData(): Awaitable<InputType<T>['Data']>;

    abstract setElement(element: InputType<T>['Element'] | null): void;

    abstract setError(error: InputType<T>['Error'] | null): void;

    constructor(props) {
        super(props);

        this.setElement(props.element ?? null);
    }

    @AfterMountView()
    protected mountInput() {
        this.props.inputRef?.(this);
    }

    @BeforeUnmountView()
    protected unmountInput() {
        this.props.inputRef?.(null);
    }


}
