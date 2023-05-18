/**
 * 插值
 */

// 数值插值
const interpolateNumber = (t: number, start: number, stop: number): number => {
  return start * (1 - t) + stop * t;
};

// 颜色插值
const interpolateColor = (t: number, d0: string, d1: string) => {
  const [r0, g0, b0] = hexToRgb(d0);
  const [r1, g1, b1] = hexToRgb(d1);
  const r = String(interpolateNumber(t, r0, r1));
  const g = String(interpolateNumber(t, g0, g1));
  const b = String(interpolateNumber(t, b0, b1));
  return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
}

const hexToRgb = (hex: string) => {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`));
  }
  return rgb;
}

const rgbToHex = (r: number, g: number, b: number) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`;
}

export {
  interpolateNumber,
  interpolateColor
};