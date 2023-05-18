const equal = ([x0, y0]: number[], [x1, y1]: number[]) => {
  return closeTo(x0, x1) && closeTo(y0, y1);
};

const closeTo = (x: number, y: number, tol = 1e-5) => {
  return Math.abs(x - y) < tol;
};


const dist = ([x0, y0]: number[], [x1 = 0, y1 = 0]: number[] = []) => {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
};

const sub = ([x1, y1]: number[], [x0, y0]: number[]) => {
  return [x1 - x0, y1 - y0];
};

// 计算两个向量之间的夹角
const angleBetween = (v0: number[], v1: number[]) => {
  const a0 = angle(v0);
  const a1 = angle(v1);
  if (a0 < a1) return a1 - a0;
  return Math.PI * 2 - (a0 - a1);
};

const angle = ([x, y]: number[]) => {
  const theta = Math.atan2(y, x);
  return theta;
};

const degree = (radian: number) => {
  return (radian * 180) / Math.PI;
};

// const unique = (points: number[][], x = (d: number[]) => d[0], y = (d: number[]) => d[1]) => {
//   const overlap = (a: number[], b: number[]) => closeTo(x(a), x(b)) && closeTo(y(a), y(b));
//   return points.filter((d: number[], index: number) => points.findIndex((p) => overlap(d, p)) === index);
// };

const unique = <T>(points: T[], x = (d: number[]) => d[0], y = (d: number[]) => d[1]) => {
  const overlap = (a: number[], b: number[]) => closeTo(x(a), x(b)) && closeTo(y(a), y(b));
  return points.filter((d: any, index: number) => points.findIndex((p: any) => overlap(d, p)) === index);
};

export {
  dist,
  sub,
  equal,
  angle,
  angleBetween,
  degree,
  unique
};