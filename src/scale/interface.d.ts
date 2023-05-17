type CreateLinear = {
  domain: number[],
  range: number[],
  interpolate?: (t: number, start: number, stop: number) => number;
};

type CreateTime = {
  domain: [Date, Date],
  range: number[],
};

type CreateOrdinal = {
  domain: string[],
  range: string[] | number[];
};

type CreateBand = {
  domain: string[];
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

export {
  CreateLinear,
  CreateTime,
  CreateOrdinal,
  CreateBand,
  bandScale,
  CreateThreshold
};