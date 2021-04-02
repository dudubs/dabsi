export function getParameterName(target: Function, index: number) {
  const s = target.toString();
  return s
    .match(
      s.startsWith("class")
        ? /constructor\s*\((?<args>[^)]+)\)/
        : /\((?<args>[^)]+)\)/
    )
    ?.groups?.args.split(",")
    [index].trim();
}
