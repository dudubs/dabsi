// uses for build-views after all routers is loaded and we
// can use router-metadata.

buildRouterViews.builders = [] as (() => void)[];

export function buildRouterViews() {
  while (buildRouterViews.builders.length) {
    const { builders } = buildRouterViews;
    buildRouterViews.builders = [];

    for (const builder of builders) {
      builder();
    }
  }
}
