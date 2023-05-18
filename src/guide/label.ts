import type { CreateLabel } from './interface.d';

const labelLeftUp: CreateLabel = (renderer, label, { x, y }, { isOrdinal, ...options }) => {
  const text = isOrdinal ? label : `↑ ${label}`;
  renderer.text({ ...common(options), text, x, y, dy: '-1em' });
}

const labelLeftDown: CreateLabel = (renderer, label, { x, y }, { isOrdinal, ...options }) => {
  const text = isOrdinal ? label : `↓ ${label}`;
  renderer.text({ ...common(options), text, x, y, dy: '2.2em' });
}

const labelBottomRight: CreateLabel = (renderer, label, { x, y }, { isOrdinal, tickLength, ...options }) => {
  const ty = y + tickLength;
  const text = isOrdinal ? label : `${label} →`;
  renderer.text({ ...common(options), text, x, y: ty, dy: '2.2em' });
}

const labelTopRight: CreateLabel = (renderer, label, { x, y }, { isOrdinal, tickLength, ...options }) => {
  const ty = y - tickLength;
  const text = isOrdinal ? label : `${label} →`;
  renderer.text({ ...common(options), text, x, y: ty, dy: '-1.2em' });
}

const common = ({ fontSize = '16' }) => {
  return { textAnchor: 'end', class: 'label', fontWeight: 'bold', fontSize };
}

export {
  labelLeftUp,
  labelLeftDown,
  labelBottomRight,
  labelTopRight
}