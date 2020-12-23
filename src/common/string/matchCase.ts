export type TargetCase = (words: Iterable<string>) => string;
export type SourceCase = (text: string) => Iterable<string>;

export function matchCase(
  text: string,
  source: SourceCase,
  target: TargetCase
) {
  return target(source(text));
}
