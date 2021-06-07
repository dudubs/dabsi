export default function Override(): MethodDecorator {
  return (target, propertyName) => {
    if (
      !Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(target),
        propertyName
      )
    ) {
      throw new Error(
        `Can't override "${target.constructor.name}.${String(propertyName)}".`
      );
    }
  };
}
