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

const isFutureTripPoint = (date) => {
  const now = dayjs();
  const startDate = dayjs(date);

  return startDate.isAfter(now);
};

const isPresentTripPoint = (dateStart, dateEnd) => {
  const now = dayjs();
  const startDate = dayjs(dateStart);
  const endDate = dayjs(dateEnd);

  return startDate.isBefore(now) && endDate.isAfter(now);
};

const isPastTripPoint = (date) => {
  const now = dayjs();
  const endDate = dayjs(date);

  return endDate.isBefore(now);
};

export {humanizeTripPointDate, sortByPrice, sortByTime, isFutureTripPoint, isPresentTripPoint, isPastTripPoint};
