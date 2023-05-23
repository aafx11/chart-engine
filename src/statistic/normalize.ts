import type { CreateNormalizeY } from './interface';
import { group } from '../utils';

function createNormalizeY() {
  return ({ index, values }: {
    index: number[];
    values: {
      [key: string]: any[];
    };
  }) => {
    const { x: X } = values;
    const series: any = X ? Array.from(group(index, (i) => X[i]).values()) : [index];
    const newValues = Object.fromEntries(
      ['y1', 'y']
        .filter((key) => values[key])
        .map((key) => [key, new Array(index.length)]),
    );
    for (const I of series) {
      const Y = I.flatMap((i: number) => Object.keys(newValues).map((key) => values[key][i]));
      const n = Math.max(...Y);
      for (const i of I) {
        for (const key of Object.keys(newValues)) {
          newValues[key][i] = values[key][i] / n;
        }
      }
    }
    return {
      index,
      values: {
        ...values,
        ...newValues,
      },
    };
  };
}


export {
  createNormalizeY
};