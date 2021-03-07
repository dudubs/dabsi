import { RootReactor } from "@dabsi/view/react/reactor/Reactor";
import React from "react";

export const ReactorContext = React.createContext(RootReactor);
export const useReactor = () => React.useContext(ReactorContext);
