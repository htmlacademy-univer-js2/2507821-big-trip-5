const getEventDuration = (time) => {
  const days = Math.floor(time / (86400 * 1000));
  time -= days * (86400 * 1000);
  const hours = Math.floor(time / (3600 * 1000));
  time -= hours * (3600 * 1000);
  const minutes = Math.floor(time / (60 * 1000));
  return `${days}D ${hours}H ${minutes}m`;
};

export {getEventDuration};
