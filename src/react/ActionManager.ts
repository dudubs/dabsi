import React from "react";
import { touchMap } from "../common/map/touchMap";

export type ActionType<T> = new (...args) => T;

export type ActionListener = (action: any) => void;

export class ActionManager {
  actionMap = new Map();
  actionListenerMap = new Map<Function, Set<ActionListener>>();

  constructor() {}

  emit(action: object) {
    if (this.actionMap.get(action.constructor) !== action) {
      this.actionMap.set(action.constructor, action);
      const listeners = this.actionListenerMap.get(action.constructor);
      listeners?.forEach(callback => {
        callback(action);
      });
    }
  }

  listen<T>(actionType: ActionType<T>, callback: (action: T) => void) {
    const listeners = touchMap(
      this.actionListenerMap,
      actionType,
      () => new Set()
    );
    return () => {
      listeners.delete(callback);
      if (!listeners.size) {
        this.actionListenerMap.delete(actionType);
      }
    };
  }
}

const context = React.createContext(new ActionManager());
export const useActionManager = () => React.useContext(context);
