const createSVGElement = (type: string) => {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
};

const mount = (parent: Element, child: Element): void => {
  if (parent) {
    parent.appendChild(child);
  }
};

const applyAttributes = (element: Element, attributes: Record<string, any>): void => {
  for (const [key, value] of Object.entries(attributes)) {
    // 将 strokeWidth 的属性转换成 stroke-width 的形式
    const kebabCaseKey = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`);
    element.setAttribute(kebabCaseKey, value);
  }
};

const applyTransform = (element: Element, transform: string) => {
  const oldTransform = element.getAttribute('transform') || '';
  // 将新的变换指定到后面的变换后，这里需要字符串拼接
  const prefix = oldTransform ? `${oldTransform} ` : '';
  element.setAttribute('transform', `${prefix}${transform}`);
};

export {
  createSVGElement,
  mount,
  applyAttributes,
  applyTransform
};