export class ResolveError extends Error {
  constructor(message: string, public child?: ResolveError) {
    super(message);
  }

  toString() {
    return `${this.message}${this.child ? `, ${this.child}` : ""}`;
  }
}
