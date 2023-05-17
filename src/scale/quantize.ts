import type { CreateThreshold } from './interface.d';
import { createThreshold } from './threshold';

// 根据 range 的数量平等划分 domain 定义域
const createQuantize = ({ domain: [d0, d1], range }: CreateThreshold) => {
  const n = range.length - 1;
  const step = (d1 - d0) / (n + 1);
  const quantizeDomain = new Array(n).fill(0).map((_, i) => step * (i + 1));
  return createThreshold({ domain: quantizeDomain, range });
};

export {
  createQuantize
};