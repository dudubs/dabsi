export function makeHtml({
  scripts = [] as string[],
  body = "",
  head = "",
} = {}) {
  return `<!DOCTYPE html>
<html>
<head>
${scripts.map(src => `<script src="${src}"></script>`).join("\n")}
${head}
</head>
<body>
${body}
</body>
</html>
`;
}
