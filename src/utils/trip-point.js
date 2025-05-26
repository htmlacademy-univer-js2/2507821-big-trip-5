import dayjs from 'dayjs';
import { DATE_FORMAT } from './const';

const humanizeTripPointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortEvent = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.date, pointB.date);

  return weight ?? dayjs(pointA.date).diff(dayjs(pointB.date));
};

export {humanizeTripPointDate, getWeightForNullDate, sortEvent};
