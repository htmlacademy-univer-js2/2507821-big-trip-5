import AbstractView from '../framework/view/abstract-view';
import { humanizeTripPointDate } from '../utils/trip-point';

const createOffersTemplate = (offers) => {
  const offersList = [];
  for (let i = 0; i < offers.length; i++) {
    const {name, price} = offers[i];
    const listItem = `<li class="event__offer">
                    <span class="event__offer-title">${name}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </li>`;
    offersList.push(listItem);
  }
  return offersList.join('\n');
};

const createTripPointTemplate = (point) => {
  const {type, destination, timeStr, duration, price, offers, isFavorite, date} = point;
  const [startTime, endTime] = timeStr.split(' - ');
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${humanizeTripPointDate(date)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T14:30">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T16:05">${endTime}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createOffersTemplate(offers)}
                </ul>
                <button class="event__favorite-btn  ${(isFavorite) ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class TripPointView extends AbstractView {
  #point;
  #removeKeyDownHandler;
  #handleFavoriteClick;
  #handleEditClick;

  constructor({point, onFavoriteClick, onEditClick}) {
    super();
    this.#point = point;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#pointFavoriteHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#point);
  }

  get removeKeyDownHandler() {
    return this.#removeKeyDownHandler;
  }

  #pointFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
    // const button = evt.target.closest('.event__favorite-btn');
    // if (!this.#point.isFavorite) {
    //   button.classList.remove('event__favorite-btn--active');
    // } else {
    //   button.classList.add('event__favorite-btn--active');
    // }
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
