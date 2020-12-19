import { fromConstantCase } from "@dabsi/common/string/fromConstantCase";
import { matchCase } from "@dabsi/common/string/matchCase";
import { toTitleCase } from "@dabsi/common/string/toTitleCase";

import { createElement, Fragment, ReactElement, ReactNode } from "react";

const matchTokenCase = token => matchCase(token, fromConstantCase, toTitleCase);

export default class LangSerivce {
  translateToken(token: string): string {
    return matchTokenCase(token);
  }

  translateTemplate(
    token: string,
    strings: string[],
    params: string[],
    props: Record<string, ReactNode>
  ): ReactElement {
    return createElement(
      Fragment,
      null,
      ...strings
        .toSeq()
        .flatMap((string, index) =>
          typeof params[index] === "string"
            ? [matchTokenCase(string), props[params[index]]]
            : [matchTokenCase(string)]
        )
    );
  }
}
