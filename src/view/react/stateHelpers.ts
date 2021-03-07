import { Dispatch, SetStateAction } from "react";

export type UsedState<S> = [S, Dispatch<SetStateAction<S>>];
export type StateProps<S> = { state: S; setState: Dispatch<SetStateAction<S>> };
