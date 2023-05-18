import type { Renderer } from "../renderer/interface.d";
type Channels = {
  [key: string]: {
    name: string,
    optional?: boolean;
    scale?: string;
  };
};

type CircleOptions = {
  cx: number;
  cy: number;
  r: number;
  [key: string]: any;
};

type Render = (
  renderer: Renderer,
  I: any[],
  scales: any,
  values: { [key: string]: any[]; },
  directStyles: { [key: string]: any; },
  coordinate: any,
) => any;

type Shape = (
  renderer: Renderer,
  coordinate: any,
  shapeOptions: CircleOptions
) => SVGElement | SVGElement[];

export {
  Channels,
  CircleOptions,
  Render,
  Shape
};