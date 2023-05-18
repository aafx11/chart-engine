import { Renderer } from "../../src/renderer/interface.d";
import { createCoordinate } from '../../src/coordinate';
import { createRenderer } from '../../src/renderer';
import { mount, createDiv } from '../utils';

const renderAxis = ({ scale, transforms, axis, ...options }: {
  scale: any;
  transforms: any[];
  axis: (renderer: Renderer, scale: any, coordinate: any, { domain, label, tickCount, formatter, tickLength, grid, tick, }: {
    [key: string]: any;
  }) => void;
  [key: string]: any;
}) => {
  const coordinate = createCoordinate({
    x: 30,
    y: 30,
    width: 540,
    height: 340,
    transforms,
  });
  const renderer = createRenderer(600, 400);
  mount(createDiv(), renderer.node());
  axis(renderer, scale, coordinate, options);
  return renderer.node();
}

const firstOf = (svg: SVGElement, className: string) => {
  const [node] = svg.getElementsByClassName(className);
  return {
    toBeNull() {
      expect(node).toBeUndefined();
    },
    toEqual<T>({ textContent, ...attributes }: { [key: string]: T }) {
      const renderedAttributes = Object.keys(attributes).reduce((obj: { [key: string]: string | null }, key) => {
        obj[key] = node.getAttribute(key);
        return obj;
      }, {});
      expect(renderedAttributes).toEqual(attributes);
      if (textContent) {
        expect(textContent).toBe(node.textContent);
      }
    },
  };
}

export {
  renderAxis,
  firstOf
}