import { mainCli } from "./mainCli";
import { monCli } from "./monCli";
import { typestackCli } from "./typestackCli";

if (require.main === module) {
  monCli() || typestackCli() || mainCli();
}
