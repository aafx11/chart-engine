import type { CreateBand, bandScale } from './interface.d';
import { createOrdinal } from './ordinal';

const createBand = <T>(options: CreateBand<T>) => {
  const { step, bandWidth, bandRange } = band(options);
  const scale: bandScale = createOrdinal({ ...options, range: bandRange });

  scale.bandWidth = () => bandWidth;
  scale.step = () => step;

  return scale;
};

const band = <T>({ domain, range, padding, margin = padding }: CreateBand<T>) => {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (margin * 2 + n - padding);
  const bandWidth = step * (1 - padding);
  const x = (_: number, i: number) => r0 + margin * step + step * i;

  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x)
  };
};

export {
  createBand
};