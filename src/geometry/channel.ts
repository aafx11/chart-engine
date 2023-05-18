const createChannel = ({
  name,
  optional = true,
  ...rest
}: {
  name: string,
  optional?: boolean;
  [key: string]: any;
}) => {
  return { name, optional, ...rest };
};

const createChannels = (options = {}) => {
  return {
    x: createChannel({ name: 'x', optional: false }),
    y: createChannel({ name: 'y', optional: false }),
    stroke: createChannel({ name: 'stroke' }),
    fill: createChannel({ name: 'fill' }),
    ...options,
  };
};

export {
  createChannel,
  createChannels
};