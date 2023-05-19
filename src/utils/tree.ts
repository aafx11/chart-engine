import type { ViewTree } from "../view/interface.d";

const descendants = (root: ViewTree): ViewTree[] => {
  const nodes: ViewTree[] = [];
  const push = (d:ViewTree) => nodes.push(d);
  bfs(root, push);
  return nodes;
};

const bfs = (root: ViewTree, callback: any) => {
  const discovered = [root];
  while (discovered.length) {
    const node = discovered.pop();
    callback(node);
    discovered.push(...(node!.children || []));
  }
};

export {
  descendants,
  bfs
};