export default function notNull<T>(
  value: T,
  errorOrCallback?
): Exclude<T, null> {
  if (value === null)
    throw new Error(
      typeof errorOrCallback === "function"
        ? errorOrCallback()
        : errorOrCallback
    );
  // @ts-ignore
  return value;
}
