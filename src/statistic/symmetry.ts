import type { CreateSymmetryY } from './interface';
import { group } from '../utils';

const createSymmetryY: CreateSymmetryY = () => {
  return ({ index, values }) => {
    const { x: X } = values;
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];
    const newValues = Object.fromEntries(
      ['y1', 'y']
        .filter((key) => values[key])
        .map((key) => [key, new Array(index.length)]),
    );

    const M: number[] = new Array(series.length);
    for (const [i, I] of Object.entries(series)) {
      const Y = I.flatMap((i: number) => Object.keys(newValues).map((key) => values[key][i]));
      const min = Math.min(...Y);
      const max = Math.max(...Y);
      M[+i] = (min + max) / 2;
    }

    const maxM = Math.max(...M);
    for (const [i, I] of Object.entries(series)) {
      const offset = maxM - M[+i];
      for (const i of I) {
        for (const key of Object.keys(newValues)) {
          newValues[key][i] = values[key][i] + offset;
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
};

export {
  createSymmetryY
};