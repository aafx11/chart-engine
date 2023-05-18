import { CreateOrdinal } from "./interface.d";

// 序数坐标
const createOrdinal = <T>({ domain, range }: CreateOrdinal<T>) => {
  const key = JSON.stringify;
  const indexMap = new Map(domain.map((d, i) => [key(d), i]));
  return (x: string): string | number => {
    const index = indexMap.get(key(x));
    return range[index! % range.length];
  };
};

export {
  createOrdinal
};