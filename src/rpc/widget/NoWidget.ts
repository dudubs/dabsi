import {NoRpc} from "../NoRpc";
import {Widget} from "./Widget";

export type NoWidget = Widget<{
    Handler: {},
    Controller: NoRpc,
    Props: {},
    Context: {},
    Connection: {}
    Config: null
    Element: undefined
}>;
export const NoWidget: NoWidget = Widget<NoWidget>({
    context: {
        controllerConfig: null,
        async getElement() {
            return undefined
        }
    }
});
