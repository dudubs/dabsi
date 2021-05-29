export function* splitToken(token: string) {
  let subToken = "";
  for (const key of token.split("/")) {
    subToken += (subToken ? "/" : "") + key;
    yield subToken;
  }
}
