import React from "react";
import { Reactor, RootReactor } from "@dabsi/react/reactor/Reactor";

export const ReactorContext = React.createContext(RootReactor);
export const useReactor = () => React.useContext(ReactorContext);
