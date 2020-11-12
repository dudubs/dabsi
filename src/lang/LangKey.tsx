import { ReactElement, ReactNode, useMemo } from "react";
import { fromPropertyCase } from "../common/string/fromPropertyCase";
import { matchCase, SourceCase } from "../common/string/matchCase";
import { toConstantCase } from "../common/string/toConstantCase";
import { LangPropsType } from "./Lang";
import { LangView } from "./LangView";
import React from "react";

export function LangKey(props: {
  for: string;
  children: ReactNode;
  sourceCase?: SourceCase;
}): ReactElement {
  return useMemo(() => {
    if (props.children != undefined) {
      return <>{props.children}</>;
    }

    return (
      <LangView
        type={LangPropsType.token}
        token={matchCase(
          props.for,
          props.sourceCase || fromPropertyCase,
          toConstantCase
        )}
      />
    );
  }, [props.children, props.for]);
}
