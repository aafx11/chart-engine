type Context = {
  node: SVGElement;
  group: SVGElement;
};

type Renderer = {
  circle: (options: Record<string, any>) => SVGElement;
  text: (options: Record<string, any>) => SVGElement;
  restore: () => (context: Context) => void;
  save: () => (context: Context) => void;
  rotate: (...args: [number]) => (context: Context, theta: number) => void;
  translate: (...args: [number, number]) => (context: Context, tx: number, ty: number) => void;
};

export {
  Context,
  Renderer
};