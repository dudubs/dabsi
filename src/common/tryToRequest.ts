// useful when you want to make dynamic require.
export default function tryToRequire(name: string) {
  try {
    return (() => {
      try {
        return require;
      } catch {}
    })()?.(name);
  } catch {}
}
