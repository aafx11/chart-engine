const transform = (type: string, transformer: any) => {
  transformer.type = () => type;
  return transformer;
};

const translate = (tx = 0, ty = 0) => {
  return transform('translate', ([px, py]: number[]) => [px + tx, py + ty]);
};

const scale = (sx = 1, sy = 1) => {
  return transform('scale', ([px, py]: number[]) => [px * sx, py * sy]);
};

const reflect = () => {
  return transform('reflect', scale(-1, -1));
};

const reflectX = () => {
  return transform('reflectX', scale(-1, 1));
};

const reflectY = () => {
  return transform('reflectY', scale(1, -1));
};

const transpose = () => {
  return transform('transpose', ([px, py]: number[]) => [py, px]);
};

const polar = () => {
  return transform('polar', ([theta, radius]: number[]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
};

export {
  translate,
  scale,
  reflect,
  reflectX,
  reflectY,
  transpose,
  polar
};