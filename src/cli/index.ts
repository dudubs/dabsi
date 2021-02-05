import mainCli from "./mainCli";
import monCli from "@dabsi/cli/monCli";
import typestackCli from "@dabsi/typestack/cli";

if (require.main === module) {
  monCli() || typestackCli() || mainCli();
}
