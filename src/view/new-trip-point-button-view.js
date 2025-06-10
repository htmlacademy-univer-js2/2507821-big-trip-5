import AbstractView from '../framework/view/abstract-view.js';

function createNewTripPointButtonTemplate(isDisabled) {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${(isDisabled) ? 'disabled' : ''}>New event</button>`;
}

export default class NewTripPointButtonView extends AbstractView {
  #handleClick = null;
  #isDisabled = null;

  constructor({onClick, isDisabled = false}) {
    super();
    this.#handleClick = onClick;
    this.#isDisabled = isDisabled;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewTripPointButtonTemplate(this.#isDisabled);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
