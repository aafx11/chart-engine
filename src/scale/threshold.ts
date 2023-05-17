import { bisect } from '../utils';
import type { CreateThreshold } from './interface.d';
const createThreshold = ({ domain, range }: CreateThreshold) => {
  const n = Math.min(domain.length, range.length - 1);
  const scale = (x: number) => {
    const index = bisect(domain, x);
    return range[index === -1 ? n : index];
  };
  scale.thresholds = () => domain;
  return scale;
};

export {
  createThreshold
};