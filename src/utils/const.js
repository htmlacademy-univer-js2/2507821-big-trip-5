const DATE_FORMAT = 'D MMM';
const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const EDIT_TRIP_POINT_DATE_FORMAT = 'D/M/YY HH:mm';
const EDIT_TRIP_POINT_DATE_FORMAT_FLATPICKR = 'j/n/y H:i';


const FylterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

const TripPointData = {
  type: null,
  destination: null,
  timeStr: null,
  date: null,
  duration: null,
  price: null,
  offers: [],
  isFavorite: null
};

const SortType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export {SortType, DATE_FORMAT, FylterType, TripPointData, API_DATE_FORMAT, EDIT_TRIP_POINT_DATE_FORMAT, EDIT_TRIP_POINT_DATE_FORMAT_FLATPICKR};

