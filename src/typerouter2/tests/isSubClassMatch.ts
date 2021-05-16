export function isSubClassMatch(base): jasmine.AsymmetricMatcher<any> {
  return {
    asymmetricMatch(o) {
      return base === o || base.isPrototypeOf(o);
    },
    jasmineToString() {
      return `<isSubClassOf ${base.name}>`;
    },
  };
}
