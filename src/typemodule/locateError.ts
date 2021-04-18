export function locateError(error, location: string) {
  if (typeof error?.stack === "string") {
    error.stack = error.stack.replace(/(\n\s*at\s+)/, x =>
      [x, location, x].join("")
    );
    return error;
  }

  return error;
}
