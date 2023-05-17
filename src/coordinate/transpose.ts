import type { CanvasOptions } from './interface.d';
import { curry } from '../utils';
import { reflectX, translate, transpose as transposeT } from './transforms';

function coordinate(transformOptions: any, canvasOptions: CanvasOptions) {
  return [
    transposeT(),
    translate(-0.5, -0.5),
    reflectX(),
    translate(0.5, 0.5),
  ];
}

const transpose = curry(coordinate);

export {
  transpose
};
