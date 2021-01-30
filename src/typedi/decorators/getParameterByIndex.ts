export default function (
  target: Function,
  index: number,
  isConstructor = false
) {
  return target
    .toString()
    .match(
      isConstructor ? /constructor\s*\((?<args>[^)]+)\)/ : /\((?<args>[^)]+)\)/
    )
    ?.groups?.args.split(",")
    [index].trim();
}
