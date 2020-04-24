import {ComponentType, Fragment, ReactNode} from "react";

export type Container = ComponentType<{ children?: ReactNode }>;
export const Container: Container = Fragment;
