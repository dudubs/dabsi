import React from "react";

export default function mapChildren(children, callback) {
  let index = 0;
  return React.Children.map(children, function mapCallback(child: any) {
    return child?.type === React.Fragment
      ? React.Children.map(child.props.children, mapCallback)
      : callback(child, index++);
  });
}
