import type { Interval } from './interface.d';
const identity = (x: any) => {
  return x;
};

const compose = (...fns: any[]) => {
  return fns.reduce((total, cur) => (x: any) => cur(total(x)), identity);
};

// 解决精度问题
const round = (n: number) => {
  return Math.round(n * 1e12) / 1e12;
};

const normalize = (value: number, start: number, stop: number): number => {
  return (value - start) / (stop - start);
};

// 优化定义域
const nice = (domain: [number, number], interval: Interval) => {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
};

const ceil = (n: number, base: number) => {
  return base * Math.ceil(n / base);
};
const floor = (n: number, base: number) => {
  return base * Math.floor(n / base);
};

const curry = (fn: (...args: any[]) => any) => {
  const arity = fn.length;
  return function curried<T>(...args: T[]): any {
    const newArgs = args.length === 0 ? [undefined] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
};

export {
  identity,
  compose,
  round,
  normalize,
  nice,
  ceil,
  floor,
  curry
};