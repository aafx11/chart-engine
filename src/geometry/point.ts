import { createChannel, createChannels } from './channel';
import { createGeometry } from './geometry';
import { circle } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  r: createChannel({ name: 'r' }),
});

const render = (renderer: any, I: any[], scales: any, values: { [key: string]: any[]; }, directStyles: { [key: string]: any; }, coordinate: any) => {
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