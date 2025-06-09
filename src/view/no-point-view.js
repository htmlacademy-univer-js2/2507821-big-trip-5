import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../utils/const';


const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoTripPointTemplate = (filterType) => {
  const text = NoPointsTextType[filterType];
  return(`<p class="trip-events__msg">${text}</p>`);
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripPointTemplate(this.#filterType);
  }
}
