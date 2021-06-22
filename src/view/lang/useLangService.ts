import LangService from "@dabsi/view/lang/LangService";
import ViewContext from "@dabsi/view/react/ViewContext";

ViewContext.setDefault(LangService, new LangService());

export default () => ViewContext.use(LangService);
