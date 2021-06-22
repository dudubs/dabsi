import mapChildren from "@dabsi/view/react/mapChildren";
import React from "react";
import { View, ViewStyle } from "react-native";

export type BaseRnGridProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};
export type RnGridContainerProps = BaseRnGridProps & {
  noIndex?: boolean;
  direction?: ViewStyle["flexDirection"];
  flex?: ViewStyle["flex"];
  shrink?: ViewStyle["flexShrink"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  flexShrink?: ViewStyle["flexShrink"];
  itemGrow?: ViewStyle["flexGrow"];
  itemStyle?: ((index: number) => ViewStyle) | ViewStyle;
  itemAlignSelf?: ViewStyle["alignSelf"];
  spacing?: number;
  wrap?: ViewStyle["flexWrap"];
  alignContent?: ViewStyle["alignContent"];
};

export type RnGridItemProps = {
  index?: number;
  alignSelf?: ViewStyle["alignSelf"];
  grow?: ViewStyle["flexGrow"];
  children?: React.ReactNode;
};
export type RnGridProps =
  | ({
      item: true;
    } & RnGridItemProps)
  | ({
      container: true;
    } & BaseRnGridProps &
      RnGridContainerProps);

const GridContext = React.createContext({
  index: 0,
  props: {} as Extract<RnGridProps, { container: true }>,

  spacingStyle: null as ViewStyle | null,
});

const containerStyles: (keyof RnGridContainerProps)[] = [
  "justifyContent",
  "alignContent",
  "alignItems",
  "flexShrink",
  "wrap",
  "flex",
];

const spacingMarginTypeMap: {
  [K in NonNullable<ViewStyle["flexDirection"]>]: `margin${
    | "Top"
    | "Bottom"
    | "Left"
    | "Right"}`;
} = {
  column: "marginTop",
  row: "marginLeft",
  "column-reverse": "marginBottom",
  "row-reverse": "marginRight",
};

const itemStyles: [
  propKey: keyof RnGridItemProps,
  containerKey: keyof RnGridContainerProps,
  styleKey: keyof ViewStyle
][] = [
  ["grow", "itemGrow", "flexGrow"],
  ["alignSelf", "itemAlignSelf", "alignSelf"],
];

export default function RnGrid(props: RnGridProps);
export default function RnGrid(
  p: Extract<RnGridProps, { item: boolean }> &
    Extract<RnGridProps, { container: boolean }>
) {
  const c = React.useContext(GridContext);

  const style: ViewStyle = {};

  for (const k of containerStyles) {
    const v = p[k];
    if (v === undefined) continue;
    if (!p.container) {
      throw new Error(`Grid "${k}" can use only for container.`);
    }
    style[k] = v;
  }

  for (const [pk, ck, sk] of itemStyles) {
    const v = p[pk] ?? c.props[ck];
    if (v === undefined) continue;
    if (!p.item) {
      throw new Error(
        `Grid "${p[pk] !== undefined ? pk : ck}" can use only for item.`
      );
    }
    (style as any)[sk] = v!;
  }

  let { children } = p;

  if (p.item) {
    let index = c.index;

    if (p.index !== undefined) {
      if (!c.props.noIndex) {
        throw new Error(`container must to be noIndex.`);
      }
      index = p.index!;
    }

    const { itemStyle } = c.props;

    index && Object.assign(style, c.spacingStyle);

    itemStyle &&
      Object.assign(
        style,
        typeof itemStyle === "function" ? itemStyle(index) : itemStyle
      );
  }

  if (p.container) {
    const { direction = "row" as const } = p;
    const spacingMarginType = spacingMarginTypeMap[direction];
    style.flexDirection = direction;

    const spacingStyle: ViewStyle = p.spacing
      ? { [spacingMarginType]: p.spacing * 5 }
      : {};

    if (p.noIndex) {
      children = (
        <GridContext.Provider
          value={{
            index: 0,
            props: p,
            spacingStyle,
          }}
        >
          {children}
        </GridContext.Provider>
      );
    } else {
      children = mapChildren(children, (child, index) => (
        <GridContext.Provider
          value={{
            index,
            spacingStyle,
            props: p,
          }}
        >
          {child}
        </GridContext.Provider>
      ));
    }
  }

  return <View style={[style, p.style]}>{children}</View>;
}
