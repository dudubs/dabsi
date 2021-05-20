import mainCli from "./mainCli";
import monCli from "@dabsi/cli/monCli";
import typestackCli from "@dabsi/typestack/typestackCli";

if (require.main === module)
  (async () => {
    for (const cli of [monCli, typestackCli, mainCli]) {
      if (await cli()) break;
    }
  })();
