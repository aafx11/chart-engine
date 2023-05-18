type Context = {
  node: SVGElement;
  group: SVGElement;
};

type Renderer = {
  line: (options: Record<string, any>) => SVGElement;
  circle: (options: Record<string, any>) => SVGElement;
  text: (options: Record<string, any>) => SVGElement;
  rect: (options: Record<string, any>) => SVGElement;
  path: (options: Record<string, any>) => SVGElement;
  ring: (options: Record<string, any>) => SVGElement[];
  restore: () => void;
  save: () => void;
  scale: (...args: [number, number]) => void;
  rotate: (...args: [number]) => void;
  translate: (...args: [number, number]) => void;
  node: () => node;
  group: () => node;
};

export {
  Context,
  Renderer
};