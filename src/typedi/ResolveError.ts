import nested from "../common/string/nested";

export class ResolveError extends Error {
  constructor(message: string) {
    super(message);
  }

  at(message: string): ResolveError {
    return new ResolveError("At " + message + nested(this.message));
  }
}
