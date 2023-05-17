import type { Context } from './interface.d';
import { createSVGElement, mount } from '../utils';

const createContext = (width: number, height: number): Context => {
  const svg = createSVGElement('svg');
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const g = createSVGElement('g');
  mount(svg, g);

  return {
    node: svg,
    group: g
  };
};

export {
  createContext
};