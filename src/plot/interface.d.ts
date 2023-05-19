type SPNode = {
  type?: string;
  data?: any[],
  scales?: Recode<ChannelTypes, Scale>,
  transforms?: Transform[],
  statistics?: Statistic[],
  encodings?: Recode<ChannelTypes, Encode>,
  guides?: Recode<ChannelTypes, Guide>,
  styles?: Record<string, string>;
  children?: SPNode[];
  paddingLeft?: number,
  paddingRight?: number,
  paddingTop?: number,
  paddingBottom?: number,
};

type Guide = (renderer: Renderer, scale: any, coordinate: any, { domain, label, tickCount, formatter, tickLength, grid, tick, }: {
  [key: string]: any;
}) => void;

type Ctor = ({ domain: [d0, d1], range: [r0, r1], interpolate }: {
  domain: number[],
  range: number[],
  interpolate?: (t: number, start: number, stop: number) => number;
}) => {
  (x: number): number;
  ticks(tickCount?: number): number[];
  nice(tickCount?: number): void;
};

export {
  SPNode,
  Guide,
  Ctor
};