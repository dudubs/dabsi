import { useReactor } from "./Reactor";

export type ReactorEmitter = (event: object) => void;
export function useEmitter(): ReactorEmitter {
  const reactor = useReactor();
  return event => {
    reactor.emit(event);
  };
}
