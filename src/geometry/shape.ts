import type { CircleOptions } from "./interface.d";
import type { Renderer } from "../renderer/interface.d";


const circle = (renderer: Renderer, coordinate: any, { cx, cy, r, ...styles }: CircleOptions) => {
  const [px, py] = coordinate([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles });
};

const text = (renderer: Renderer, coordinate: any, { x, y, rotate, text, ...styles }: CircleOptions) => {
  const [px, py] = coordinate([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate);
  const textElement = renderer.text({ text, x: 0, y: 0, ...styles });
  renderer.restore();
  return textElement;
};

export {
  circle,
  text
};