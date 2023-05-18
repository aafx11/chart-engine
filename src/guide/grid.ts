import type { CreateGrid } from './interface.d';
import { dist } from '../utils';

const gridVertical: CreateGrid = (renderer, ticks, end) => {
  const [, y2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2: x, y2, stroke: '#eee', class: 'grid' });
  }
}

const gridHorizontal: CreateGrid = (renderer, ticks, end) => {
  const [x2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2, y2: y, stroke: '#eee', class: 'grid' });
  }
}

const gridRay: CreateGrid = (renderer, ticks, end) => {
  const [x2, y2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2, y2, stroke: '#eee', class: 'grid' });
  }
}

const gridCircular: CreateGrid = (renderer, ticks, end) => {
  const [cx, cy] = end;
  for (const { x, y } of ticks) {
    const r = dist(end, [x, y]);
    renderer.circle({ fill: 'none', stroke: '#eee', cx, cy, r, class: 'grid' });
  }
}

export {
  gridVertical,
  gridHorizontal,
  gridRay,
  gridCircular
}