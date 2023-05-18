import type { CreateBand } from './interface.d';
import { createBand } from "./band";

const createPoint = <T>(options: CreateBand<T>) => {
  return createBand({ ...options, padding: 1 });
};

export {
  createPoint
};