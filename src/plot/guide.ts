const inferGuides = (scales: any, dimensions: any, options: any) => {
  const { x: xScale, y: yScale, color: colorScale } = scales;
  const { x = {}, y = {}, color = {} } = options;
  const { display: dx = true } = x;
  const { display: dy = true } = y;
  const { display: dc = true } = color;

  return {
    ...(dx && xScale && { x: { ...merge(x, xScale), type: 'axisX' } }),
    ...(dy && yScale && { y: { ...merge(y, yScale), type: 'axisY' } }),
    ...(dc && colorScale && {
      color: {
        ...merge(color, colorScale),
        ...inferPosition(dimensions),
        type: inferLegendType(colorScale),
      }
    }),
  };
};

function merge(options: any, { domain, label }: any) {
  return { ...options, domain, label };
}

function inferLegendType({ type }: { type: string; }) {
  switch (type) {
    case 'linear': case 'log': case 'time':
    case 'threshold': case 'quantile': case 'quantize':
      return 'legendRamp';
    default:
      return 'legendSwatches';
  }
}

function inferPosition({ x, y, paddingLeft }: {
  x: number;
  y: number;
  paddingLeft: number;
}) {
  return { x: x + paddingLeft, y };
}

export {
  inferGuides
};