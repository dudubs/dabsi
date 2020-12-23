import LangServiceContext from "@dabsi/lang/LangServiceContext";
import {
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

export default function ({
  token: _token,
  template,
}: {
  token?: string;
  template?: {
    strings: string[];
    params: string[];
    props: Record<string, ReactNode>;
  };
}): ReactElement {
  const context = useContext(LangServiceContext);
  const token = useMemo(() => {
    if (template) {
      const { strings, params } = template;
      return strings
        .toSeq()
        .flatMap(
          (string, index: number) =>
            typeof params[index] === "string"
              ? [string, "{", params[index], "}"]
              : [string],
          "}"
        )
        .join("");
    }
    return _token!;
  }, [_token, typeof template]);
  if (template) {
    return context.translateTemplate(
      token,
      template.strings,
      template.params,
      template.props
    );
  }
  return createElement(Fragment, null, context.translateToken(token!));
}
