import { entries } from "@dabsi/common/object/entries";

export function assignDefault(o, d) {
  for (const [k, v] of entries(d)) {
    if (!o.hasOwnProperty(k)) {
      o[k] = v;
    }
  }
}
