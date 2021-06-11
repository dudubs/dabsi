export function makeHtml({
  scripts = [] as string[],
  body = "",
  head = "",
} = {}) {
  return `<!DOCTYPE html>
<html>
<head>
${head}
${scripts.map(src => `<script src="${src}"></script>`).join("\n")}
</head>
<body>
${body}
</body>
</html>
`;
}
