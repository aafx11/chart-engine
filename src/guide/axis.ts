import type { Renderer } from "../renderer/interface.d";
import type { Coordinate } from "../coordinate/interface.d";
import type { Components } from "./interface.d";
import { identity, lastOf } from '../utils';

const createAxis = (components: Components) => {
  return (
    renderer: Renderer,
    scale: any,
    coordinate: any,
    {
      domain,
      label,
      tickCount = 10,
      formatter = identity,
      tickLength = 5,
      grid = false,
      tick = true,
    }: {
      [key: string]: any
    },
  ) => {
    if (domain.length === 0) return;
    const fontSize = 10;
    const isOrdinal = !!scale.bandWidth;
    const isQuantitative = !!scale.ticks;
    const offset = isOrdinal ? scale.bandWidth() / 2 : 0;
    const values = isQuantitative ? scale.ticks(tickCount) : domain;

    const center = coordinate.center();
    const type = `${+coordinate.isPolar()}${+coordinate.isTranspose()}`;
    const options = { tickLength, fontSize, center, isOrdinal };

    const { grid: Grid, ticks: Ticks, label: Label, start, end } = components[type];
    const ticks = values.map((d: any) => {
      const [x, y] = coordinate(start(d, scale, offset));
      const text = formatter(d);
      return { x, y, text };
    });
    const labelTick: { x: number; y: number; } = (() => {
      if (!isOrdinal) return lastOf(ticks);
      const value = lastOf(values);
      const [x, y] = coordinate(start(value, scale, offset * 2));
      return { x, y };
    })();

    if (grid && Grid) Grid(renderer, ticks, end(coordinate));
    if (tick && Ticks) Ticks(renderer, ticks, options);
    if (label && Label) Label(renderer, label, labelTick, options);
  };
}

export {
  createAxis
}