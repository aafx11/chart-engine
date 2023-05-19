import type { CreateLog, CreateLinear } from "./interface.d";
import { createLinear } from './linear';
import { ticks, nice, log } from '../utils';

const createLog = ({ domain, base = Math.E, ...rest }: CreateLog) => {
  const transform = (x: number) => Math.log(x);
  let linear = createLinear({ domain: domain.map(transform), ...rest } as CreateLinear);
  const scale = (x: number) => linear(transform(x));

  scale.ticks = (tickCount = 5) => {
    const [min, max] = domain.map((x) => log(x, base));
    return ticks(min, max, tickCount).map((x) => base ** x);
  };

  scale.nice = () => {
    domain = nice(domain as any, {
      floor: (x) => base ** Math.floor(log(x, base)),
      ceil: (x) => base ** Math.ceil(log(x, base)),
    });
    linear = createLinear({ domain: domain.map(transform), ...rest } as CreateLinear);
  };

  return scale;
};

export {
  createLog
};