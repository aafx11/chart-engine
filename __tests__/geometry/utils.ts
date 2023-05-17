import {
  cartesian, createCoordinate,
} from '../../src/coordinate';
import { createRenderer } from '../../src/renderer';
import { createDiv, mount } from '../utils';

export function plot({
  index,
  width = 600,
  height = 400,
  scales,
  channels,
  styles,
  geometry,
  transforms = [cartesian()],
  get = (d: any[]) => d[0],
}: any) {
  const renderer = createRenderer(width, height);
  const coordinate = createCoordinate({
    width,
    height,
    x: 0,
    y: 0,
    transforms,
  });
  const shapes = geometry(renderer, index, scales, channels, styles, coordinate);
  mount(createDiv(), renderer.node());
  const shape = get(shapes);
  return {
    toHasAttributes(expectedAttributes: { [key: string]: any; }) {
      const keys = Object.keys(expectedAttributes);
      const renderedAttributes: any = keys.reduce(
        (obj: { [key: string]: any; }, key) => (obj[key] = shape.getAttribute(key), obj),
        {},
      );
      if (keys.indexOf('tagName') !== -1) {
        renderedAttributes.tagName = shape.tagName;
      }
      expect(renderedAttributes).toEqual(expectedAttributes);
    },
  };
}
