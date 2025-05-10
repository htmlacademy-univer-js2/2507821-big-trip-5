const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomNumber = (number) => Math.random() * number;

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
const getEventDuration = (time) => {
  const days = Math.floor(time / (86400 * 1000));
  time -= days * (86400 * 1000);
  const hours = Math.floor(time / (3600 * 1000));
  time -= hours * (3600 * 1000);
  const minutes = Math.floor(time / (60 * 1000));
  return `${days}D ${hours}H ${minutes}m`;
};

export {getRandomArrayElement, getRandomNumber, updateItem, getEventDuration};
