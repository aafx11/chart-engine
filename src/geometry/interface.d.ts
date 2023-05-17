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

export {
  Channels,
  CircleOptions
};