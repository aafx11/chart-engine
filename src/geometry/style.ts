const channelStyles = (index: number, channels: { [key: string]: any; }) => {
  const { stroke: S, fill: F } = channels;
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] }),
  };
};

const groupChannelStyles = ([index]: number[], channels: { [key: string]: any; }) => {
  return channelStyles(index, channels);
};

export {
  channelStyles,
  groupChannelStyles
};