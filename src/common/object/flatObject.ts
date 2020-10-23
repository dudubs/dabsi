/*

mapObject<T,R>(

)
 */
export function flatObject(o: object) {
  const b = Object.getPrototypeOf(o);
  if (b === Object.prototype) {
    return o;
  }
  return { ...flatObject(o), ...o };
}
