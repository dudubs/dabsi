export function* getRootTokens(tokens: Iterable<string>) {
  let rootToken = "";

  for (const token of tokens) {
    if (rootToken) yield rootToken + "/*";
    rootToken += (rootToken ? "/" : "") + token;
  }
  if (rootToken) {
    yield rootToken;
  }
}
