import type { CanvasOptions } from './interface.d';
import { compose } from '../utils';

const createCoordinate = ({
  transforms: coordinates = [],
  ...canvasOptions
}: {
  transforms: any[],
} & CanvasOptions) => {
  // 将转换数组拍平
  const transforms = coordinates.flatMap((coordinate: any) => coordinate(canvasOptions));
  const types = transforms.map((d) => d.type());
  const output = compose(...transforms);
  const { x, y, width, height } = canvasOptions;

  output.isPolar = () => types.indexOf('polar') !== -1;
  // @ts-ignore
  output.isTranspose = () => types.reduce((is, type) => is ^ (type === 'transpose'), false);
  output.center = () => [x + width / 2, y + height / 2]; // 获得坐标系画布的中心

  return output;
};

export {
  createCoordinate
};