import type { ViewTree, Area } from "./interface.d";
import { computeFlexViews } from './flex';
import { computeFacetViews } from './facet';
import { computeLayerViews } from './layer';
import { descendants, group } from '../utils';

const createViews = (root: ViewTree, computes = {
  layer: computeLayerViews,
  col: computeFlexViews,
  row: computeFlexViews,
  facet: computeFacetViews,
}): [Area, ViewTree[]][] => {
  const nodes = descendants(root);
  const { width = 640, height = 480, x = 0, y = 0 } = root;
  const rootView = { width, height, x, y };
  const nodeView = new Map([[root, rootView]]);

  for (const node of nodes) {
    const view = nodeView.get(node);
    const { children = [], type } = node;
    const computeChildrenViews = computes[type!];
    if (computeChildrenViews) {
      const childrenViews = computeChildrenViews(view!, node);
      if (computeChildrenViews !== computeFacetViews) {
        for (const [i, child] of Object.entries(children)) {
          // @ts-ignore
          nodeView.set(child, childrenViews[i]);
        }
      } else {
        for (const child of children) {
          for (const view of childrenViews) {
            nodeView.set({ ...child }, view as any);
          }
        }
      }
    }
  }

  const key = (d: Area) => `${d.x}-${d.y}-${d.width}-${d.height}`;
  // @ts-ignore
  const keyViews = group(Array.from(nodeView.entries()), ([, view]) => key(view));
  return Array.from(keyViews.values()).map((views) => {
    const view = views[0][1];
    const nodes = views.map((d: any) => d[0]);
    return [view, nodes];
  });
};

export {
  createViews
};