const DATE_FORMAT = 'D MMM';
const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const EDIT_TRIP_POINT_DATE_FORMAT = 'DD/MM/YY HH:mm';


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

export {DATE_FORMAT, FylterType, TripPointData, API_DATE_FORMAT, EDIT_TRIP_POINT_DATE_FORMAT};

