type ViewTree = {
  type?: 'layer' | 'col' | 'row' | 'facet';
  children?: ViewTree[];
  [key: string]: any,
};

type Area = {
  x: number,
  y: number,
  width: number,
  height: number,
  [key: string]: any;
};

// type ComputeFacetViews = (
//   box: Area,
//   facetViewsOptions: {
//     data: any;
//     encodings: {
//       x: number;
//       y: number;
//     };
//     padding: number;
//     paddingLeft: number;
//     paddingRight: number;
//     paddingBottom: number;
//     paddingTop: number;
//   }
// ) => views[];

type ComputeFacetViews = (
  box: Area,
  facetViewsOptions: ViewTree
) => Views[];

type Views = {
  x: number;
  y: number;
  width: number;
  height: number;
  transform: (data: any) => any;
};

export {
  ViewTree,
  Area,
  ComputeFacetViews,
  Views
};