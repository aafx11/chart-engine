import { firstOf, map } from '../utils';
import { categoricalColors } from './theme';

const inferEncodings = (type: string, data: any, encodings: any) => {
  const typedEncodings = map(encodings, (encoding, key) => ({
    type: inferType(data, encoding, key),
    value: encoding,
  }));

  switch (type) {
    case 'interval':
      return maybeFill(maybeZeroX(maybeZeroY1(typedEncodings)));
    case 'line':
      return maybeStroke(maybeGroup(typedEncodings));
    case 'area':
      return maybeFill(maybeIdentityX(maybeZeroY1(maybeGroup(typedEncodings)) as any));
    case 'link':
      return maybeStroke(maybeIdentityX(typedEncodings));
    case 'point':
      return maybeZeroY(maybeStroke(typedEncodings));
    case 'rect':
      return maybeFill(maybeZeroX1(maybeZeroY1(typedEncodings)));
    case 'cell':
      return maybeFill(typedEncodings);
    default:
      break;
  }

  return typedEncodings;
};

const valueOf = (data: any, { type, value }: { type: string, value: any; }) => {
  if (type === 'transform') return data.map(value);
  if (type === 'value') return data.map(() => value);
  return data.map((d: any) => d[value]);
};

function inferType(data: any, encoding: any, name: string) {
  if (typeof encoding === 'function') return 'transform';
  if (typeof encoding === 'string') {
    if (data.length && firstOf<any>(data)[encoding] !== undefined) return 'field';
    if (isStyle(name)) return 'constant';
  }
  return 'value';
}

function isStyle(type: string) {
  return type === 'fill' || type === 'stroke';
}

function maybeFill({ fill = color(), ...rest }) {
  return { fill, ...rest };
}

function maybeStroke({ stroke = color(), ...rest }) {
  return { stroke, ...rest };
}

function maybeZeroY1({ y1 = zero(), ...rest }) {
  return { y1, ...rest };
}

function maybeZeroX1({ x1 = zero(), ...rest }) {
  return { x1, ...rest };
}

function maybeZeroY({ y = zero(), ...rest }) {
  return { y, ...rest };
}

function maybeZeroX({ x = zero(), ...rest }) {
  return { x, ...rest };
}

function maybeIdentityX({ x, x1 = x, ...rest }:any) {
  return { x, x1, ...rest };
}

function maybeGroup({ fill, stroke, z, ...rest }:any) {
  if (z === undefined) z = maybeField(fill);
  if (z === undefined) z = maybeField(stroke);
  return { fill, stroke, z, ...rest };
}

function maybeField(encoding:any) {
  if (encoding === undefined || encoding.type !== 'field') return undefined;
  return encoding;
}

function zero() {
  return { type: 'value', value: 0 };
}

function color() {
  return { type: 'constant', value: categoricalColors[0] };
}

export {
  inferEncodings,
  valueOf
};