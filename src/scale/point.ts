import type { CreateBand } from './interface.d';
import { createBand } from "./band";

const createPoint = (options: CreateBand) => {
  return createBand({ ...options, padding: 1 });
};

export {
  createPoint
};