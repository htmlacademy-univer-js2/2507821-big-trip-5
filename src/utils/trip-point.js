import dayjs from 'dayjs';
import { DATE_FORMAT } from './const';

const humanizeTripPointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';

export {humanizeTripPointDate};
