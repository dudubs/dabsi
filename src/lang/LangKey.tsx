import fromPropertyCase from "@dabsi/common/string/fromPropertyCase";
import { matchCase, SourceCase } from "@dabsi/common/string/matchCase";
import { toConstantCase } from "@dabsi/common/string/toConstantCase";
import LangComponent from "@dabsi/lang/LangComponent";
import React, { createElement, ReactElement, ReactNode, useMemo } from "react";

export default function ({
  token,
  children,
  sourceCase = fromPropertyCase,
}: {
  token: string;
  children: ReactNode;
  sourceCase?: SourceCase;
}): ReactElement {
  return useMemo(() => {
    if (children != undefined) {
      return <>{children}</>;
    }

    return createElement(LangComponent, {
      token: matchCase(token, sourceCase, toConstantCase),
    });
  }, [token, typeof children]);
}
