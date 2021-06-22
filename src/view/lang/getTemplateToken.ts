import joinTemplate from "@dabsi/common/string/joinTemplate";

export default function getTemplateToken(
  strings: readonly string[],
  params: readonly string[]
): string {
  return joinTemplate(strings, params, (string, param) =>
    param ? [string, "{", param, "}"] : [string]
  );
}
