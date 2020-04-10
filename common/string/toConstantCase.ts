export function toConstantCase(text: string) {
    return text.replace(/[A-Z][a-z]+/g, x => '_' + x).toUpperCase()
}
