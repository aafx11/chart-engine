/**
 * 插值
 */

// 数值插值
const interpolateNumber = (t: number, start: number, stop: number): number => {
  return start * (1 - t) + stop * t;
};

// 颜色插值
const interpolateColor = () => {
  // t, d0, d1
  // const [r0, g0, b0] = hexToRgb(d0);
  // const [r1, g1, b1] = hexToRgb(d1);
};

// function hexToRgb(hex) {
//   const rgb = [];
//   for (let i = 1; i < 7; i += 2) {
//     rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`));
//   }
//   return rgb;
// }

export {
  interpolateNumber,
  interpolateColor
};