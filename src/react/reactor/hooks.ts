import { WeakId } from "@dabsi/common/WeakId";
import { RootReactor } from "@dabsi/react/reactor/Reactor";
import React from "react";

export const ReactorContext = React.createContext(RootReactor);
export const useReactor = () => React.useContext(ReactorContext);
