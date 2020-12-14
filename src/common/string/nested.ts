export default function (text: string): string {
  return text.replace(/(^|\n)/g, "\n  ");
}
