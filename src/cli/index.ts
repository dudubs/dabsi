import { mainCli } from "./mainCli";
import { monCli } from "@dabsi/cli/monCli";
import { typestackCli } from "@dabsi/cli/typestackCli";

if (require.main === module) {
  monCli() || typestackCli() || mainCli();
}
