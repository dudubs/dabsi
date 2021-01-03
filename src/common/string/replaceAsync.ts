export default async function replaceAsync(
  pattern: RegExp,
  text: string,
  repalcer: (
    match: string[] & { groups: any; index: number }
  ) => Promise<string>
) {
  let outText = "";
  let lastIndex = 0;
  let hasMatch = false;
  for (const match of text.matchAll(pattern)) {
    hasMatch = true;
    outText += text.slice(lastIndex, match.index);
    outText += await repalcer(<any>match);
    lastIndex = match.index! + match[0].length;
  }
  if (lastIndex) {
    return outText + text.slice(lastIndex);
  }
  return hasMatch ? outText : text;
}
