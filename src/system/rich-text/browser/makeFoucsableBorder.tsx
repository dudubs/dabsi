export function makeFoucsableBorder({ color, width, theme }) {
  return {
    zIndex: 100,
    content: '" "',
    position: "absolute",
    border: `${width}px solid ${color}`,
    top: -width,
    left: -width,
    bottom: -width,
    right: -width,
    borderRadius: theme.shape.borderRadius,
  };
}
