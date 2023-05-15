import { applyAttributes, createSVGElement, mount } from './utils';
import type { Context } from './interface.d';

const shape = (type: string, context: Context, attributes: Record<string, any>): SVGElement => {
  const { group } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);

  mount(group, el);
  return el;
};

const line = (context: Context, attributes: Record<string, any>): SVGElement => {
  return shape('line', context, attributes);
};

const rect = (context: Context, attributes: Record<string, any>): SVGElement => {
  const { width, height, x, y } = attributes;
  // rect 不支持 width 和 height 是负数
  return shape('rect', context, {
    ...attributes,
    width: `${Math.abs(width)}`,
    height: `${Math.abs(height)}`,
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
};

const circle = (context: Context, attributes: Record<string, any>) => {
  return shape('circle', context, attributes);
};

const text = (context: Context, attributes: Record<string, any>) => {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text; // 通过 textContent 设置标签内的内容
  return textElement;
};

/**
 * d 路径的格式
 * [ ['M', 10, 10], ['L', 100, 100], ['L', 100, 10], ['Z'] ]
 * 转换为 'M 10 10 L 100 100 L 100 10 Z'
 */
const path = (context: Context, attributes: Record<string, any>) => {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
};

const ring = (context: Context, attributes: Record<string, any>) => {
  // r1 是内圆的半径，r2 是外圆的半径
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;

  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });

  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });

  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });

  return [innerStroke, ring, outerStroke];
};

export {
  shape,
  line,
  rect,
  circle,
  text,
  path,
  ring
};