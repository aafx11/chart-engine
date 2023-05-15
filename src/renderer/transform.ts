
import type { Context } from './interface.d';
import { applyTransform, createSVGElement, mount } from './utils';

const transform = (type: string, context: Context, ...params: any[]) => {
  console.log('参数', params);
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
};

// 平移
const translate = (context: Context, tx: number, ty: number) => {
  transform('translate', context, tx, ty);
};

// 旋转
const rotate = (context: Context, theta: number) => {
  transform('rotate', context, theta);
};

// 缩放
const scale = (context: Context, sx: number, sy: number) => {
  transform('scale', context, sx, sy);
};

// 保存状态
const save = (context: Context) => {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
};

// 重置状态
const restore = (context: Context) => {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode as SVGElement;
};

export {
  transform,
  translate,
  rotate,
  scale,
  save,
  restore
};