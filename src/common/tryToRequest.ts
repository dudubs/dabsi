export default function tryToRequire(name: string) {
  try {
    return eval("require")?.(name);
  } catch {}
}
