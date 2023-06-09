type CreateLinear = {
  domain: number[],
  range: number[],
  interpolate?: (t: number, start: number, stop: number) => number;
};

type CreateTime = {
  // domain: [Date, Date],
  domain: Date[],
  range: number[],
};

type CreateOrdinal<T> = {
  domain: T[],
  range: string[] | number[];
};

type CreateBand<T> = {
  domain: T[];
  range: [number, number];
  padding: number;
  margin?: number;
};

type bandScale = {
  (x: string): string | number;
  bandWidth?: () => number;
  step?: () => number;
};

type CreateThreshold = {
  domain: number[];
  range: string[];
};

type CreateLog = {
  domain: number[],
  base: number,
  [key: string]: any;
};

export {
  CreateLinear,
  CreateTime,
  CreateOrdinal,
  CreateBand,
  bandScale,
  CreateThreshold,
  CreateLog
};