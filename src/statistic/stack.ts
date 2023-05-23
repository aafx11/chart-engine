import type { CreateStackY } from './interface';
import { group } from '../utils';

// const createStackY: CreateStackY = () => {
//   return ({ index, values }) => {
//     const { y: Y, x: X } = values;
//     const series: any = X ? Array.from(group<number>(index, (i) => X[i]).values()) : [index];
//     const newY = new Array(index.length);
//     const newY1 = new Array(index.length);
//     for (const I of series) {
//       for (let py = 0, i = 0; i < I.length; py = newY[I[i]], i += 1) {
//         const index = I[i];
//         newY1[index] = py;
//         newY[index] = py + Y[index];
//       }
//     }
//     return {
//       index,
//       values: { ...values, y: newY, y1: newY1 },
//     };
//   };
// };

function createStackY() {
  return ({ index, values }: {
    index: number[];
    values: {
      [key: string]: any[];
    };
  }) => {
    const { y: Y, x: X } = values;
    const series: any = X ? Array.from(group<number>(index, (i) => X[i]).values()) : [index];
    const newY = new Array(index.length);
    const newY1 = new Array(index.length);
    for (const I of series) {
      for (let py = 0, i = 0; i < I.length; py = newY[I[i]], i += 1) {
        const index = I[i];
        newY1[index] = py;
        newY[index] = py + Y[index];
      }
    }
    return {
      index,
      values: { ...values, y: newY, y1: newY1 },
    };
  };

}

export {
  createStackY
};