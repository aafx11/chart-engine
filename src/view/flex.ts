import type { ViewTree, Area } from "./interface.d";

const computeFlexViews = (box: Area, node: ViewTree) => {
  const { type, children, flex = children!.map(() => 1), padding = 40 } = node;
  const [mainStart, mainSize, crossSize, crossStart]: string[] = type === 'col'
    ? ['y', 'height', 'width', 'x']
    : ['x', 'width', 'height', 'y'];

  const sum = flex.reduce((total: number, value: number) => total + value);
  const totalSize = box[mainSize] - padding * (children!.length - 1);
  const sizes = flex.map((value: number) => totalSize * (value / sum));

  const childrenViews = [];
  for (let next = box[mainStart], i = 0; i < sizes.length; next += sizes[i] + padding, i += 1) {
    childrenViews.push({
      [mainStart]: next,
      [mainSize]: sizes[i],
      [crossStart]: box[crossStart],
      [crossSize]: box[crossSize],
    });
  }
  return childrenViews;
};

export {
  computeFlexViews
};