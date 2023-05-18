type CanvasOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Coordinate = {
  isPolar: () => boolean;
  isTranspose: () => boolean;
  center: () => number[]
}

export {
  CanvasOptions,
  Coordinate
};