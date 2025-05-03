const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomNumber = (number) => Math.random() * number;

const handleEsc = (callback, ...args) => {
  const onKeydown = (evt) => {
    if (evt.key === 'Escape') {
      callback(...args);
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  return () => document.removeEventListener('keydown', onKeydown);
};

export {getRandomArrayElement, getRandomNumber, handleEsc};
