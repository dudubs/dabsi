const kws = (process.env.TEST_KWS || "")
  .split(" ")
  .map(kw => kw.trim())
  .map(kw => {
    const exclude = kw.startsWith("!");
    return { exclude, kw: exclude ? kw.substr(1) : kw };
  });

jasmine.getEnv().configure({
  specFilter: (spec: jasmine.Spec) => {
    const fullName = spec.getFullName();
    for (const { kw, exclude } of kws) {
      if (fullName.indexOf(kw) > -1) {
        if (exclude) {
          return false;
        }
      } else if (!exclude) {
        return false;
      }
    }
    return true;
  },
});
