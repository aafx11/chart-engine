import { dist, angleBetween, sub } from '../utils';

// 直线路径数组
const line = ([p0, ...points]: number[][]): (number | string)[][] => {
  return [
    ['M', ...p0],
    ...points.map((p) => ['L', ...p]),
  ];
};

// 直线连成区域
const area = (points: number[][]) => {
  return [
    ...line(points),
    ['Z'],
  ];
};

const sector = ([c, p0, p1, p2, p3]:number[][]) => {
  const r = dist(c, p0);
  const r1 = dist(c, p2);
  const a = angleBetween(sub(p0, c), sub(p1, c));
  const l = a > Math.PI ? 1 : 0;
  const l1 = a > Math.PI ? 1 : 0;
  return [
    ['M', p0[0], p0[1]],
    ['A', r, r, 0, l, 1, p1[0], p1[1]],
    ['L', p2[0], p2[1]],
    ['A', r1, r1, 0, l1, 0, p3[0], p3[1]],
    ['Z'],
  ];
};

const ring = ([c, [r1, r2]]:number[][]) => {
  const [cx, cy] = c;
  const p0 = [cx, cy - r2];
  const p1 = [cx, cy + r2];
  const p2 = [cx, cy + r1];
  const p3 = [cx, cy - r1];
  return [
    ...sector([c, p0, p1, p2, p3]),
    ...sector([c, p1, p0, p3, p2]),
  ];
};


export {
  line,
  area,
  sector,
  ring
};