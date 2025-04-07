import { getRandomArrayElement, getRandomNumber } from '../utils';

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
    duration: '01H 10M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length))
  },
  {
    type: getRandomArrayElement(POINTTYPE),
    destination: 'Moscow',
    timeStr: '11:30 - 11:40',
    duration: '10M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length))
  },
  {
    type: getRandomArrayElement(POINTTYPE),
    destination: 'Moscow',
    timeStr: '11:30 - 11:40',
    duration: '10M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length))
  },
  {
    type: getRandomArrayElement(POINTTYPE),
    destination: 'Moscow',
    timeStr: '11:30 - 11:35',
    duration: '05M',
    price: Math.floor(getRandomNumber(1000)),
    offers: Array.from(mockOffer.slice(Math.random() * mockOffer.length))
  }
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export {getRandomPoint};
