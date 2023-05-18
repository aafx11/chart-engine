import type { Renderer } from "../renderer/interface.d";
import { area as pathArea, line as pathLine, ring as pathRing } from './d';

// 绘制等高线
const contour = (renderer: Renderer, { points, ...styles }: { points: number[][]; }) => {
  const end = points.length;
  const mid = end / 2;
  const contour = renderer.path({ d: pathArea(points), ...styles, stroke: 'none' });
  const outerStroke = renderer.path({ d: pathLine(points.slice(0, mid)), ...styles, fill: 'none' });
  const innerStroke = renderer.path({ d: pathLine(points.slice(mid, end)), ...styles, fill: 'none' });
  return [innerStroke, contour, outerStroke];
};

const ring = (renderer: Renderer, { cx, cy, r1, r2, ...styles }: { [key: string]: any; }) => {
  const ring = renderer.path({ ...styles, d: pathRing([[cx, cy], [r1, r2]]), stroke: 'none' });
  const innerStroke = renderer.circle({ ...styles, fill: 'none', r: r1, cx, cy });
  const outerStroke = renderer.circle({ ...styles, fill: 'none', r: r2, cx, cy });
  return [innerStroke, ring, outerStroke];
};

export {
  contour,
  ring
};