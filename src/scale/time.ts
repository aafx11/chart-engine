import type { CreateTime } from "./interface.d";
import { createLinear } from "./linear";

// 创建时间比例
const createTime = ({ domain, range }: CreateTime) => {
  const transform = (x: Date) => x.getTime();
  const transformDomain = domain.map(transform);
  const linear = createLinear({ domain: transformDomain, range });

  const scale = (x: Date) => linear(transform(x));
  scale.nice = (tickCount: number) => linear.nice(tickCount);
  scale.ticks = (tickCount: number) => linear.ticks(tickCount).map(d => new Date(d));

  return scale;
};

export {
  createTime
};