import type { Render } from './interface.d';
import { createChannel, createChannels } from './channel';
import { createGeometry } from './geometry';
import { circle } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  r: createChannel({ name: 'r' }),
});

const render: Render = (renderer, I, scales, values, directStyles, coordinate) => {
  const defaults = {
    r: 3,
    fill: 'none'
  };
  const { x: X, y: Y, r: R = [] } = values;
  return Array.from(I, (i: number) => {
    const { r: dr, ...restDefaults } = defaults;
    const r = R[i] || dr;
    return circle(renderer, coordinate, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, values),
      cx: X[i],
      cy: Y[i],
      r,
    });
  });
};

const point = createGeometry(channels, render);

export {
  point
};