import type { Channels } from './interface.d';
const createGeometry = (channels: Channels, render: any) => {
  const geometry = (renderer: any, I: any[], scales: any, values: { [key: string]: any[]; }, styles: { [key: string]: any; }, coordinate: any) => {
    for (const [key, { optional, scale }] of Object.entries(channels)) {
      if (!optional) {
        if (!values[key]) throw new Error(`Missing Channel: ${key}`);
        if (scale === 'band' && (!scales[key] || !scales[key].bandWidth)) {
          throw new Error(`${key} channel needs band scale.`);
        }
      }
    }
    return render(renderer, I, scales, values, styles, coordinate);
  };

  geometry.channels = () => channels;

  return geometry;
};

export {
  createGeometry
};