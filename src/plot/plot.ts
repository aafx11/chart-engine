import { createViews } from '../view';
import { createRenderer } from '../renderer';
import { createCoordinate } from '../coordinate';
import { create } from './create';
import { inferScales, applyScales } from './scale';
import { initialize } from './geometry';
import { inferGuides } from './guide';
import { bfs, identity, map, assignDefined } from '../utils';

const plot = (root: any) => {
  const { width = 640, height = 480, renderer: plugin } = root;
  const renderer = createRenderer(width, height);
  flow(root);
  const views = createViews(root);
  for (const [view, nodes] of views) {
    const { transform = identity, ...dimensions } = view;
    const geometries = [];
    const scales = {};
    const guides = {};
    let coordinates = [];
    const chartNodes = nodes.filter(({ type }: any) => isChartNode(type));
    for (const options of chartNodes) {
      const {
        scales: s = {},
        guides: g = {},
        coordinates: c = [],
        transforms = [],
        paddingLeft, paddingRight, paddingBottom, paddingTop,
        ...geometry
      } = options;
      assignDefined(scales, s);
      assignDefined(guides, g);
      assignDefined(dimensions, { paddingLeft, paddingRight, paddingBottom, paddingTop });
      if (c) coordinates = c;
      // @ts-ignore
      geometries.push({ ...geometry, transforms: [transform, ...transforms] });
    }
    plotView({ renderer, scales, guides, geometries, coordinates, ...dimensions });
  }
  return renderer.node();
}

function plotView({
  renderer,
  scales: scalesOptions,
  guides: guidesOptions,
  coordinates: coordinateOptions,
  geometries: geometriesOptions,
  width, height, x, y,
  paddingLeft = 45, paddingRight = 45, paddingBottom = 45, paddingTop = 65,
}: any) {
  const geometries = geometriesOptions.map(initialize);
  const channels = geometries.map((d: any) => d.channels);
  const scaleDescriptors = inferScales(channels, scalesOptions);
  const guidesDescriptors = inferGuides(scaleDescriptors, { x, y, paddingLeft }, guidesOptions);

  const scales = map(scaleDescriptors, create);
  const guides = map(guidesDescriptors, create);

  const transforms = inferCoordinates(coordinateOptions).map(create);
  const coordinate = createCoordinate({
    x: x + paddingLeft,
    y: y + paddingTop,
    width: width - paddingLeft - paddingRight,
    height: height - paddingTop - paddingBottom,
    transforms,
  });

  for (const [key, guide] of Object.entries(guides)) {
    const scale = scales[key];
    (guide as any)(renderer, scale, coordinate);
  }

  for (const { index, geometry, channels, styles } of geometries) {
    const values = applyScales(channels, scales);
    geometry(renderer, index, scales, values, styles, coordinate);
  }
}

function isChartNode(type: string) {
  switch (type) {
    case 'layer': case 'col': case 'row': return false;
    default:
      return true;
  }
}

function flow(root: any) {
  bfs(root, ({ type, children, ...options }: any) => {
    if (isChartNode(type)) return;
    if (!children || children.length === 0) return;
    const keyDescriptors = [
      'o:encodings', 'o:scales', 'o:guides', 'o:styles',
      'a:coordinates', 'a:statistics', 'a:transforms', 'a:data',
    ];
    for (const child of children) {
      for (const descriptor of keyDescriptors) {
        const [type, key] = descriptor.split(':');
        if (type === 'o') {
          child[key] = { ...options[key], ...child[key] };
        } else {
          child[key] = child[key] || options[key];
        }
      }
    }
  });
}

function inferCoordinates(coordinates: any) {
  return [...coordinates, { type: 'cartesian' }];
}

export {
  plot
}