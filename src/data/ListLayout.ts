import {Layout} from "../react/utils/Layout";
import {ListItemProps} from "./ListItem";

export type ListLayoutProps<T> = {
    Container: Layout.Container;
    NoItems: Layout;
    Loading: Layout;
    Item: Layout<ListItemProps<T>>;
};
