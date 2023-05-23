import { firstOf, group, lastOf, map, defined } from '../utils';
import { interpolateColor, interpolateNumber } from '../scale';
import { categoricalColors, ordinalColors } from './theme';

const inferScales = (channels: any[], options: any) => {
  const scaleChannels = group(channels.flatMap(Object.entries), ([name]) => scaleName(name) as any);
  const scales: any = {};
  for (const [name, channels] of scaleChannels) {
    const channel = mergeChannels(name as string, channels);
    const o = options[name] || {};
    const type = inferScaleType(channel, o);
    scales[name] = {
      ...o,
      ...inferScaleOptions(type, channel, o),
      domain: inferScaleDomain(type, channel, o),
      range: inferScaleRange(type, channel, o),
      label: inferScaleLabel(type, channel, o),
      type,
    };
  }
  return scales;
};

const applyScales = (channels: any, scales: any) => {
  return map(channels, ({ values, name }) => {
    const scale = scales[scaleName(name)];
    return values.map(scale);
  });
};

function scaleName(name: string) {
  if (name.startsWith('x')) return 'x';
  if (name.startsWith('y')) return 'y';
  if (isColor(name)) return 'color';
  return name;
}

function mergeChannels(name: string, channels: any) {
  const values = [];
  let scale;
  let field;
  for (const [, { values: v = [], scale: s, field: f }] of channels) {
    values.push(...v);
    if (!scale && s) scale = s;
    if (!field && f) field = f;
  }
  return { name, scale, values, field };
}

function inferScaleType({ name, scale, values }: any, { type, domain, range }: any) {
  if (scale) return scale;
  if (type) return type;
  if ((domain || range || []).length > 2) return asOrdinalType(name);
  if (domain !== undefined) {
    if (isOrdinal(domain)) return asOrdinalType(name);
    if (isTemporal(domain)) return 'time';
    return 'linear';
  }
  if (isOrdinal(values)) return asOrdinalType(name);
  if (isTemporal(values)) return 'time';
  if (isUnique(values)) return 'identity';
  return 'linear';
}

function inferScaleDomain(type: string, { values }: any, { domain, ...options }: any) {
  if (domain) return domain;
  switch (type) {
    case 'linear':
    case 'log':
    case 'quantize':
      return inferDomainQ(values, options);
    case 'ordinal':
    case 'dot':
    case 'band':
      return inferDomainC(values);
    case 'quantile':
      return inferDomainO(values, options);
    case 'time':
      return inferDomainT(values, options);
    default:
      return [];
  }
}

function inferScaleRange(type: string, { name }: { name: string; }, { range }: { range: any; }) {
  if (range) return range;
  switch (type) {
    case 'linear':
    case 'log':
    case 'time':
    case 'band':
    case 'dot':
      return inferRangeQ(name);
    case 'ordinal':
      return categoricalColors;
    case 'quantile':
    case 'quantize':
    case 'threshold':
      return ordinalColors;
    default:
      return [];
  }
}

function inferScaleOptions(type: string, { name }: { name: string; }, { padding, interpolate, margin }: { padding: number, interpolate: any, margin: number; }) {
  switch (type) {
    case 'linear': case 'log':
      if (interpolate) return { interpolate };
      return { interpolate: name === 'color' ? interpolateColor : interpolateNumber };
    case 'band':
      return { padding: padding !== undefined ? padding : 0.1 };
    case 'dot':
      return { margin: margin !== undefined ? margin : 0.5 };
    default:
      return {};
  }
}

function inferScaleLabel(type: string, { field }: { field: any; }, { label }: any) {
  if (label !== undefined) return label;
  return field;
}

function asOrdinalType(name: string) {
  if (isPosition(name)) return 'dot';
  return 'ordinal';
}

function isPosition(name: string) {
  return name === 'x' || name === 'y';
}

function isColor(name: string) {
  return name === 'fill' || name === 'stroke';
}

function isOrdinal(values: any[]) {
  return values.some((v) => {
    const type = typeof v;
    return type === 'string' || type === 'boolean';
  });
}

function isTemporal(values: any[]) {
  return values.some((v) => v instanceof Date);
}

function isUnique(values: any[]) {
  return Array.from(new Set(values)).length === 1;
}

function inferDomainQ(values: any[], { zero = false } = {}) {
  const definedValues = values.filter(defined);
  if (definedValues.length === 0) return [];
  const min = Math.min(...definedValues);
  const max = Math.max(...definedValues);
  return [zero ? 0 : min, max];
}

function inferDomainC(values: any[]) {
  return Array.from(new Set(values.filter(defined)));
}

function inferDomainO(values: any[], domain: any) {
  return inferDomainC(values).sort();
}

function inferDomainT(values: any[], domain: any) {
  return inferDomainQ(values, domain).map((d) => new Date(d));
}

function inferRangeQ(name: string) {
  if (name === 'y') return [1, 0];
  if (name === 'color') return [firstOf(ordinalColors), lastOf(ordinalColors)];
  return [0, 1];
}

export {
  inferScales,
  applyScales
};