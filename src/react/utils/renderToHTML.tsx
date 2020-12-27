import { Seq } from "immutable";
import { createElement, Fragment } from "react";

const FragmentType = createElement(Fragment).type;

function renderStyleToCSS(css) {
  return Seq.Keyed(css)
    .map((value, key) => {
      return `${String(key).replace(
        /[a-z][A-Z]/,
        a => a.charAt(0) + "-" + a.charAt(1).toLowerCase()
      )}: ${value}${typeof value === "number" ? "px" : ""}`;
    })
    .toIndexedSeq()
    .join(";");
}

export function renderElementToHTML(value) {
  switch (typeof value) {
    case "string":
      return value;
    case "undefined":
    case "boolean":
      return "";
    case "function":
      throw new TypeError();
    case "object":
      if (!value) return "null";
      if (Array.isArray(value)) {
        return Seq.Indexed(value).map(renderElementToHTML).join("");
      }

      const { type } = value;
      if (type === FragmentType) {
        return renderElementToHTML(value.props.children);
      }
      if (typeof type === "function") {
        return renderElementToHTML(type(value.props));
      } else if (typeof type === "string") {
        const {
          props: { children, ...attrs },
        } = value;
        return `<${type}${Seq.Keyed(attrs)
          .map((value, name) => {
            if (typeof value === "object") {
              if (name === "style") {
                value = renderStyleToCSS(value);
              }
            }
            return `${name}="${value}"`;
          })
          .toIndexedSeq()
          .join(" ")
          .let(a => (a ? " " + a : ""))}${
          !children ? "/>" : `>${renderElementToHTML(children)}</${type}>`
        }`;
      }

    default:
      return String(value);
  }
}
