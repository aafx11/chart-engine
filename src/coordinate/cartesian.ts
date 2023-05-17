import type { CanvasOptions } from './interface.d';
import { curry } from '../utils';
import { scale, translate } from './transforms';

const coordinate = (transformOptions: any, canvasOptions: CanvasOptions) => {
  const {
    x, y, width, height,
  } = canvasOptions;
  return [
    scale(width, height),
    translate(x, y),
  ];
};

const cartesian = curry(coordinate);

export {
  cartesian
};