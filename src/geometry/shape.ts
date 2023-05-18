import type { CircleOptions, Shape } from "./interface.d";
import type { Renderer } from "../renderer/interface.d";
import { dist, sub, equal } from '../utils';
import { contour, ring } from './primitive';
import { line as pathLine, area as pathArea, sector as pathSector } from './d';

const circle: Shape = (renderer, coordinate, { cx, cy, r, ...styles }) => {
  const [px, py] = coordinate([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles });
};

const text: Shape = (renderer, coordinate, { x, y, rotate, text, ...styles }) => {
  const [px, py] = coordinate([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate);
  const textElement = renderer.text({ text, x: 0, y: 0, ...styles });
  renderer.restore();
  return textElement;
};

const link: Shape = (renderer, coordinate, { x1, y1, x2, y2, ...styles }) => {
  const [p0, p1]: number[][] = [[x1, y1], [x2, y2]].map(coordinate);
  return renderer.line({ x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], ...styles });
};

const line: Shape = (renderer, coordinate, { X, Y, I: I0, ...styles }) => {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = I.map((i: number) => coordinate([X[i], Y[i]]));
  const d = pathLine(points);
  return renderer.path({ d, ...styles });
};

const area: Shape = (renderer, coordinate, { X1, Y1, X2, Y2, I: I0, ...styles }) => {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points: number[][] = [
    ...I.map((i: number) => [X1[i], Y1[i]]),
    ...I.map((i: number) => [X2[i], Y2[i]]).reverse(),
  ].map(coordinate);

  if (coordinate.isPolar()) {
    return contour(renderer, { points, ...styles });
  }
  return renderer.path({ d: pathArea(points), ...styles });
};

const rect: Shape = (renderer, coordinate, { x1, y1, x2, y2, ...styles }) => {
  const v0 = [x1, y1];
  const v1 = [x2, y1];
  const v2 = [x2, y2];
  const v3 = [x1, y2];
  const vs: number[][] = coordinate.isTranspose() ? [v3, v0, v1, v2] : [v0, v1, v2, v3];
  const ps: number[][] = vs.map(coordinate);
  const [p0, p1, p2, p3] = ps;

  if (!coordinate.isPolar()) {
    const [width, height] = sub(p2, p0);
    const [x, y] = p0;
    return renderer.rect({ x, y, width, height, ...styles });
  }

  const center: number[] = coordinate.center();
  const [cx, cy]: number[] = center;

  if (!(equal(p0, p1) && equal(p2, p3))) {
    return renderer.path({ d: pathSector([center, ...ps]), ...styles });
  }

  const r1 = dist(center, p2);
  const r2 = dist(center, p0);
  // @ts-ignore
  return ring(renderer, { cx, cy, r1, r2, ...styles });
};

const path: Shape = (renderer, coordinate, attributes) => {
  return renderer.path(attributes);
};

export {
  circle,
  text,
  link,
  line,
  area,
  rect,
  path
};