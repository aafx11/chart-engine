import type { Render } from './interface.d';
import { createChannel, createChannels } from './channel';
import { groupChannelStyles } from './style';
import { line as shapeLine } from './shape';
import { group } from '../utils';
import { createGeometry } from './geometry';

const channels = createChannels({
  z: createChannel({ name: 'z' }),
});

const render: Render = (renderer, I, scales, values, directStyles, coordinate) => {
  const defaults = {};
  const { x: X, y: Y, z: Z } = values;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(series, (I) => shapeLine(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...groupChannelStyles(I, values),
    X,
    Y,
    I,
    fill: 'none',
  }));
};

const line = createGeometry(channels, render);

export {
  line
};
