import { getRandomArrayElement, getRandomNumber } from '../utils/utils';

const POINTTYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const mockOffer = [
  {
    type: 'Order Uber',
    name: 'Order Uber',
    price: Math.floor(getRandomNumber(1000))
  },
  {
    type: 'Add luggage',
    name: 'Add luggage',
    price: Math.floor(getRandomNumber(1000))
  },
  {
    type: 'Switch to comfort',
    name: 'Switch to comfort',
    price: Math.floor(getRandomNumber(1000))
  },
  {
    type: 'Rent a car',
    name: 'Rent a car',
    price: Math.floor(getRandomNumber(1000))
  }
];


const mockPoints = [
  {
    type: getRandomArrayElement(POINTTYPE),
    destination: 'Amsterdam',
    timeStr: '10:30 - 12:40',
    date: new Date('2025-05-07'),
    duration: '01H 10M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length)),
    isFavorite: true
  },
  {
    type: getRandomArrayElement(POINTTYPE),
    destination: 'Moscow',
    timeStr: '11:30 - 11:40',
    date: new Date('2025-01-01'),
    duration: '10M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length)),
    isFavorite: true
  },
  {
    type: getRandomArrayElement(POINTTYPE),
    destination: 'Moscow',
    timeStr: '11:30 - 11:40',
    date: new Date('2025-03-04'),
    duration: '10M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length)),
    isFavorite: true
  },
  {
    type: getRandomArrayElement(POINTTYPE),
    destination: 'Moscow',
    timeStr: '11:30 - 11:35',
    date: new Date('2025-02-12'),
    duration: '05M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length)),
    isFavorite: true
  }
];

const getRandomPoint = () => ({
  id: 0,
  ...getRandomArrayElement(mockPoints)
});

export {getRandomPoint};
