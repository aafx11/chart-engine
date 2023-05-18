import type { Render } from './interface.d';
import { createChannel } from './channel';
import { createGeometry } from './geometry';
import { path as shapePath } from './shape';
import { channelStyles } from './style';

const channels = {
  d: createChannel({ name: 'd', optional: false, scale: 'identity' }),
  fill: createChannel({ name: 'fill' }),
  stroke: createChannel({ name: 'stroke' }),
};

const render: Render = (renderer, I, scales, values, directStyles, coordinate) => {
  const defaults = {};
  const { d: D } = values;
  return Array.from(I, (i) => shapePath(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...channelStyles(i, values),
    d: D[i],
  }));
};

const path = createGeometry(channels, render);

export {
  path
};
