const createDiv = (): HTMLDivElement => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return div
}

const mount = (parent: Element, child: Element) => {
  if (parent) {
    parent.appendChild(child);
  }
}

const getAttributes = (node: Element, attributes: string[]) => {
  return attributes.reduce((total, cur) => (total[cur] = node.getAttribute(cur), total), {} as any);
}

export {
  createDiv,
  mount,
  getAttributes
}