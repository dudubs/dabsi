export default function throws(message?: string): never {
  throw new Error(message);
}
