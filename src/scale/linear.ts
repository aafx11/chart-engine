import type { CreateLinear } from "./interface.d";
import { nice, normalize, ticks, tickStep, floor, ceil, } from "../utils";
import { interpolateNumber } from "./interpolate";

/**
 * 线性映射
 * @param domain 定义域（输入的范围） 
 * @param range 值域（输出的范围） 
 * @param interpolate 插值
 */
const createLinear = ({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber
}: CreateLinear) => {
  const scale = (x: number) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };

  scale.ticks = (tickCount = 10) => ticks(d0, d1, tickCount);
  scale.nice = (tickCount = 10) => {
    if (d0 === d1) return;
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });
  };

  return scale;
};

export {
  createLinear
};