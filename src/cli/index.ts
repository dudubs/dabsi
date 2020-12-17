import { mainCli } from "@dabsi/cli/mainCli";
import { monCli } from "@dabsi/cli/monCli";
import { typestackCli } from "@dabsi/cli/typestackCli";

if (require.main === module) {
  monCli() || typestackCli() || mainCli();
}
