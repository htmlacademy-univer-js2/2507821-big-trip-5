import dayjs from 'dayjs';
import { DATE_FORMAT } from './const';

const humanizeTripPointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';

const sortByPrice = (pointA, pointB) => {
  if (pointA.basePrice > pointB.basePrice) {
    return -1;
  }
  if (pointA.basePrice < pointB.basePrice) {
    return 1;
  }
  return 0;
};

const sortByTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  if (timeA > timeB) {
    return -1;
  }
  if (timeA < timeB) {
    return 1;
  }
  return 0;
};

export {humanizeTripPointDate, sortByPrice, sortByTime};
