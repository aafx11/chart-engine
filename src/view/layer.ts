import type { ViewTree, Area } from "./interface.d";
const computeLayerViews = (box: Area, node: ViewTree) => {
  const { children = [] } = node;
  return new Array(children.length).fill(0).map(() => ({ ...box }));
};

export {
  computeLayerViews
};