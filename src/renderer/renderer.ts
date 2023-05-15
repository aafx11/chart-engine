import { createContext } from './context';
import {
  line, circle, text, rect, path, ring,
} from './shape';
import {
  restore, save, scale, translate, rotate,
} from './transform';

const createRenderer = (width: number, height: number) => {
  const context = createContext(width, height);
  return {
    line: (options: Record<string, any>) => line(context, options),
    circle: (options: Record<string, any>) => circle(context, options),
    text: (options: Record<string, any>) => text(context, options),
    rect: (options: Record<string, any>) => rect(context, options),
    path: (options: Record<string, any>) => path(context, options),
    ring: (options: Record<string, any>) => ring(context, options),
    restore: () => restore(context),
    save: () => save(context),
    scale: (...args: [number, number]) => scale(context, ...args),
    rotate: (...args: [number]) => rotate(context, ...args),
    translate: (...args: [number, number]) => translate(context, ...args),
    node: () => context.node,
    group: () => context.group,
  };
};

export {
  createRenderer
};