import {FilterType} from '../utils/const.js';
import { isFutureTripPoint, isPastTripPoint, isPresentTripPoint } from './trip-point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureTripPoint(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentTripPoint(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastTripPoint(point.dateTo)),
};

export {filter};
