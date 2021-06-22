export default function joinTemplate(
  strings: readonly string[],
  params: readonly string[],
  join: (string: string, param: string | undefined) => Iterable<string>
) {
  return strings
    .toSeq()
    .flatMap((string, index) => join(string, params[index]))
    .join("");
}
