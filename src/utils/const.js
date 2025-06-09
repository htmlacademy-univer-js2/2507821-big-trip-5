const DATE_FORMAT = 'D MMM';
const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const EDIT_TRIP_POINT_DATE_FORMAT = 'D/M/YY HH:mm';
const EDIT_TRIP_POINT_DATE_FORMAT_FLATPICKR = 'j/n/y H:i';


const FilterType = {
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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight',
  destinationObject: {pictures: []}
};

export {DATE_FORMAT, SortType, FilterType, TripPointData, API_DATE_FORMAT, EDIT_TRIP_POINT_DATE_FORMAT, EDIT_TRIP_POINT_DATE_FORMAT_FLATPICKR, UserAction, UpdateType, BLANK_POINT};

