import type { Renderer } from '../renderer/interface.d';
import type { Coordinate } from '../coordinate/interface.d';

type Ticks = {
  x: number;
  y: number;
  text: string;
};

type CreateTick = (
  renderer: Renderer,
  ticks: Ticks[],
  tickOpiton: {
    tickLength: number;
    fontSize: number;
    center?: [number, number];
  }
) => void;

type CreateLabel = (
  renderer: Renderer,
  label: string,
  coordinate: {
    x: number,
    y: number
  },
  labelOptions: {
    isOrdinal: boolean,
    [key: string]: any
  }
) => void

type CreateGrid = (
  renderer: Renderer,
  ticks: Ticks[],
  end: number[]
) => void

type CreateAxis = (
  renderer: Renderer,
  scale: any,
  coordinate: any,
  axisOptions: {
    [key: string]: any
  }
) => void

type Components = {
  [key: string | number]: {
    start: (d: any, scale: any, offset: number) => number[];
    end: (coordinate: any) => number[]
    grid: CreateGrid;
    ticks: CreateTick;
    label?: CreateLabel;
  }
}

type Legend = (
  renderer: Renderer,
  scale: any,
  coordinate: Coordinate,
  legendOptions: {
    [key: string]: any
  }
) => void

export {
  Ticks,
  CreateTick,
  CreateLabel,
  CreateGrid,
  CreateAxis,
  Components,
  Legend
};