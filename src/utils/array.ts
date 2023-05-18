import { identity, round } from "./helper";

/**
 * 生成刻度间隔
 * @param min 定义域的最小值
 * @param max 定义域的最大值
 * @param count 坐标刻度的数量
 * @returns 实际间隔
 * 
 * step0 目标间隔,生成指定数量的刻度的间隔
 * step1 最后生成的刻度的间隔  step1 = 10 ^ n * b (其中 b=1,2,5)
 */
const tickStep = (min: number, max: number, count: number) => {
  const e10 = Math.sqrt(50); // 7.07
  const e5 = Math.sqrt(10); // 3.16
  const e2 = Math.sqrt(2); // 1.41

  // 获得目标间隔 step0，设 step0 = 10 ^ m
  const step0 = Math.abs(max - min) / Math.max(0, count);
  // 获得 step1 的初始值 = 10 ^ n < step0，其中 n 为满足条件的最大整数
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);

  // 计算 step1 和 step0 的误差，error = 10 ^ m / 10 ^ n = 10 ^ (m - n)
  const error = step0 / step1;
  // 根据当前的误差改变 step1 的值，从而减少误差
  // 1. 当 m - n >= 0.85 = log(e10) 的时候，step1 * 10
  // 可以减少log(10) = 1 的误差 
  if (error >= e10) step1 *= 10;
  // 2. 当 0.85 > m - n >= 0.5 = log(e5) 的时候，step1 * 5
  // 可以减少 log(5) = 0.7 的误差
  else if (error >= e5) step1 *= 5;
  // 3. 当 0.5 > m - n >= 0.15 = log(e2) 的时候，step1 * 2
  // 那么可以减少 log(2) = 0.3 的误差
  else if (error >= e2) step1 *= 2;
  // 4. 当 0.15 > m - n > 0 的时候，step1 * 1
  return step1;
};

/**
 * 生成刻度数组
 * @param min 定义域的最小值
 * @param max 定义域的最大值
 * @param count 刻度数量
 * @returns 刻度数组
 */
const ticks = (min: number, max: number, count: number): number[] => {
  if (min === max) return [min];
  const step = tickStep(min, max, count);
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = Math.ceil(stop - start + 1);
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
};

// 取数组中间下标
const bisect = (array: unknown[], x: number, lo = 0, hi = array.length, accessor = identity) => {
  let i = lo;
  let j = hi;
  while (i < j) {
    const mid = (i + j) >>> 1;
    if (accessor(array[mid]) < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
};

/**
 * 数据根据 key 分组
 * @param {T[]} array 需要分组的数据
 * @param {T => string} key 获得数据 key 的函数
 * @returns {Map<string, T>}
 * @example
 * const array = [
 *   {name:'a', value: 1},
 *   {name:'a', value: 2},
 *   {name:'b', value: 3}
 * ]
 * const groups = group(array, d => d.name);
 * groups // Map(2) {'a' => [{name: 'a', value:1}, {name: 'a', value: 2}], 'b' => [{name: 'b', value: 3}]}
 */
const group = <T>(array: T[], key = (d: T): T => d): Map<string, T> => {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
};

const lastOf = <T>(array: T[]) => {
  return array[array.length - 1];
}

const firstOf = <T>(array: T[]) => {
  return array[0];
}

const indexOf = <T>(array: T[]) => {
  return array.map((_, i) => i);
}


export {
  tickStep,
  ticks,
  bisect,
  group,
  lastOf,
  firstOf,
  indexOf
};