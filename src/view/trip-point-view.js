import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';
import { humanizeTripPointDate } from '../utils/trip-point';
import { API_DATE_FORMAT } from '../utils/const';
import { getEventDuration } from '../utils/utils';

const createOffersTemplate = (offers) => {
  const offersList = [];
  for (let i = 0; i < offers.length; i++) {
    const {title, price} = offers[i];
    const listItem = `<li class="event__offer">
                    <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </li>`;
    offersList.push(listItem);
  }
  return offersList.join('\n');
};

const createTripPointTemplate = (point) => {
  const {type, destinationName, dateFrom, dateTo, basePrice, offers, isFavorite, date} = point;
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${humanizeTripPointDate(date)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinationName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${dayjs(dateFrom, API_DATE_FORMAT).format('H:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${dayjs(dateTo, API_DATE_FORMAT).format('H:mm')}</time>
                  </p>
                  <p class="event__duration">${getEventDuration(dayjs(dateTo).diff(dateFrom))}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
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
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
