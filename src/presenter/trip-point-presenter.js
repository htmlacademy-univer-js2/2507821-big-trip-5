import TripPointView from '../view/trip-point-view';
import EditPointFormView from '../view/edit-point-view';
import { remove, render, replace } from '../framework/render';
import DestinationsModel from '../model/destinations-model';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class TripPointPresenter {
  #tripPointsContainer = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #destinations = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;
  #handleTypeChange = null;
  #handleDestinationChange = null;

  #getDestinationName = null;

  constructor({tripPointsContainer, onDataChange, onModeChange, onTypeChange, onDestinationChange, destinations, getDestinationName}) {
    this.#destinations = destinations;
    this.#tripPointsContainer = tripPointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleTypeChange = onTypeChange;
    this.#handleDestinationChange = onDestinationChange;

    this.#getDestinationName = getDestinationName;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new TripPointView({
      point: {
        ...this.#point,
        destinationName: this.#getDestinationName(this.#point.destination)
      },
      onFavoriteClick: this.#onFavoriteTripPointClick,
      onEditClick: this.#onTripPointEdit
    });

    this.#pointEditComponent = new EditPointFormView({
      point: {
        ...this.#point,
        destinationObj: DestinationsModel.getDestination(this.#point.destination)
      },
      destinations: this.#destinations,
      onFormSubmit: this.#onTripPointEditFormSubmit,
      onFormClose: this.#onTripPointEditFormClose,
      onTypeChange: this.#onTripPointTypeChange,
      onDestinationChange: this.#onTripPointDestinationChange
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#tripPointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset({
        ...this.#point,
        destinationObj: DestinationsModel.getDestination(this.#point.destination)
      });
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #onTripPointEdit = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onTripPointEditFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#onTripPointEditFormClose();
  };

  #onTripPointEditFormClose = () => {
    this.#pointEditComponent.reset({
      ...this.#point,
      destinationObj: DestinationsModel.getDestination(this.#point.destination)
    });
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFavoriteTripPointClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #onTripPointTypeChange = (type) => this.#handleTypeChange(type);

  #onTripPointDestinationChange = (destinationId) => this.#handleDestinationChange(destinationId);
}
