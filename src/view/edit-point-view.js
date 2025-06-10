import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { BLANK_POINT, EDIT_TRIP_POINT_DATE_FORMAT, EDIT_TRIP_POINT_DATE_FORMAT_FLATPICKR } from '../utils/const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createDestinationPicturesTemplate = (pictures) => {
  const destinationPicturesList = [];
  pictures.forEach((picture) => destinationPicturesList.push(`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`));
  return destinationPicturesList.join('\n');
};

const createDestinationsTemplate = (destinations) => {
  const destinationsList = [];
  destinations.forEach((destination) => destinationsList.push(`<option value="${destination.name}" data-destination-id="${destination.id}"></option>`));
  return destinationsList.join('\n');
};

const createDestinationsContainerTemplate = ({destinations, destinationObject = {}, isDisabled}) => `
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${(destinationObject.name) ? destinationObject.name : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
    <datalist id="destination-list-1">
      ${createDestinationsTemplate(destinations)}
    </datalist>`;

const createOffersTemplate = (offers, offersObject, isDisabled) => {
  const offersElements = [];
  for (let i = 0; i < offersObject.length; i++) {
    const {id, title, price} = offersObject[i];
    const offerElement = `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-luggage" ${(offers.includes(id)) ? 'checked' : '' } ${isDisabled ? 'disabled' : ''}>
                        <label class="event__offer-label" for="${id}">
                          <span class="event__offer-title">${title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>`;
    offersElements.push(offerElement);
  }
  return offersElements.join('\n');
};

const createEditPointFormTemplate = (data, destinations, isCreateFormView) => {
  const {type, basePrice, offers, offersObject, dateFrom, dateTo, destinationObject, isSaving, isDisabled, isDeleting} = data;
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${ (type === 'taxi') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${ (type === 'bus') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${ (type === 'train') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${ (type === 'ship') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${ (type === 'drive') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${ (type === 'flight') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${ (type === 'check-in') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${ (type === 'sightseeing') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${ (type === 'restaurant') ? 'checked' : '' }>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1" ${isDisabled ? 'disabled' : ''}>
                        ${type}
                    </label>
                    ${createDestinationsContainerTemplate({destinations, destinationObject, isDisabled})}
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${(dateFrom) ? dayjs(dateFrom).format(EDIT_TRIP_POINT_DATE_FORMAT) : ''}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${(dateTo) ? dayjs(dateTo).format(EDIT_TRIP_POINT_DATE_FORMAT) : ''}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${ (isSaving) ? 'Saving...' : 'Save'}</button>
                  ${ (isCreateFormView) ? `
                    <button class="event__reset-btn" type="reset">Cansel</button>
                    ` : `
                    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${ (isDeleting) ? 'Deleting...' : 'Delete'}</button>
                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                    ` }

                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    ${(offersObject.length !== 0) ? `
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                      <div class="event__available-offers">
                        ${createOffersTemplate(offers, offersObject, isDisabled)}
                      </div>
                    ` : ''}
                  </section>

                  <section class="event__section  event__section--destination">
                    ${(destinationObject.description) ? `
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${destinationObject.description}</p>` : ''}

                    ${(destinationObject.pictures.length !== 0) ? `
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${createDestinationPicturesTemplate(destinationObject.pictures)}
                        </div>
                      </div>` : ''}
                  </section>
                </section>
              </form>
            </li>`;
};

export default class EditPointFormView extends AbstractStatefulView {
  #destinations = null;
  #datePickerStart = null;
  #datePickerEnd = null;

  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleTypeChange = null;
  #handleDestinationChange = null;
  #handleDeleteClick = null;
  #isCreateFormView = null;

  constructor({point = BLANK_POINT, onFormSubmit, onFormClose, onTypeChange, onDestinationChange, destinations, onDeleteClick, offersObject, isCreateFormView = false}) {
    super();
    this._setState(EditPointFormView.parsePointToState({...point, offersObject: offersObject}));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleTypeChange = onTypeChange;
    this.#handleDestinationChange = onDestinationChange;
    this.#destinations = destinations;
    this.#handleDeleteClick = onDeleteClick;
    this.#isCreateFormView = isCreateFormView;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointFormTemplate(this._state, this.#destinations, this.#isCreateFormView);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointFormView.parseStateToPoint(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #typeChangeHandler = (evt) => {
    if (evt.target.tagName === 'LABEL') {
      const newType = evt.target.closest('.event__type-item').querySelector('input').value;
      const newOffers = this.#handleTypeChange(newType);

      this.updateElement({type: newType, offersObject: newOffers});
    }
  };

  #destinationChangeHandler = (evt) => {
    if (!this.#destinations.some((detination) => evt.target.value === detination.name)) {
      return;
    }
    const newDestinationId = this.#destinations.filter((dest) => dest.name === evt.target.value)[0].id;
    const newdestinationObject = this.#handleDestinationChange(newDestinationId);

    this.updateElement({destination: newDestinationId, destinationObject: newdestinationObject});
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointFormView.parseStateToPoint(this._state));
  };

  #handleOffersClick = (evt) => {
    if (['SECTION', 'INPUT', 'DIV', 'H3'].includes(evt.target.tagName)) {
      return;
    }
    const offerId = evt.target.closest('.event__offer-selector').querySelector('input').id;
    if (this._state.offers.includes(offerId)) {
      this._setState({offers: this._state.offers.filter((offer) => offer !== offerId)});
    } else {
      this._setState({offers: [...this._state.offers, offerId]});
    }
  };

  #handlePriceKeydown = (evt) => {
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(evt.key)) {
      evt.preventDefault();
    }
  };

  #handlePriceInput = (evt) => {
    this._setState({basePrice: Number.parseInt(evt.target.value.replace(/[^0-9]/g, ''), 10)});
  };

  #dateStartChangeHandler = ([userDate]) => {
    this.#datePickerEnd.set('minDate', userDate);
    this._setState({dateFrom: userDate});
  };

  #dateEndChangeHandler = ([userDate]) => {
    this.#datePickerStart.set('maxDate', userDate);
    this._setState({dateTo: userDate});
  };

  #setDatePicker = () => {
    this.#datePickerStart = flatpickr(
      this.element.querySelector('.event__input--time[name="event-start-time"]'),
      {
        defaultDate: this._state.dateFrom,
        onChange: this.#dateStartChangeHandler,
        enableTime: true,
        dateFormat: EDIT_TRIP_POINT_DATE_FORMAT_FLATPICKR,
        maxDate: this._state.dateTo,
        // eslint-disable-next-line camelcase
        time_24hr: true
      }
    );

    this.#datePickerEnd = flatpickr(
      this.element.querySelector('.event__input--time[name="event-end-time"]'),
      {
        defaultDate: this._state.dateTo,
        onChange: this.#dateEndChangeHandler,
        enableTime: true,
        dateFormat: EDIT_TRIP_POINT_DATE_FORMAT_FLATPICKR,
        minDate: this._state.dateFrom,
        // eslint-disable-next-line camelcase
        time_24hr: true
      }
    );
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.destinationObject;
    delete point.offersObject;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerStart) {
      this.#datePickerStart.destroy();
      this.#datePickerStart = null;
    }

    if (this.#datePickerEnd) {
      this.#datePickerEnd.destroy();
      this.#datePickerEnd = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointFormView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-list').addEventListener('click', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__section--offers').addEventListener('click', this.#handleOffersClick);
    this.element.querySelector('.event__input--price').addEventListener('keydown', this.#handlePriceKeydown);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#handlePriceInput);

    if (this.#isCreateFormView) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    } else {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    }

    this.#setDatePicker();
  }
}
